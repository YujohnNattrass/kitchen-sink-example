import { MDocument } from "@mastra/rag";
import { embedMany } from "ai";
import { openai } from "@ai-sdk/openai";
import { mastra } from "../mastra";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from 'url';
import { company, products, customers, orders, stores, inventory, promotions, categories, reviews } from "../documents/retail-store";

/**
 * Extract metadata from a chunk using regex patterns
 * @param chunk The document chunk to extract metadata from
 * @param patterns Object mapping field names to regex patterns
 * @returns Object with extracted metadata fields
 */
function extractMetadataFromChunk(chunk: any, patterns: Record<string, { regex: RegExp, parser: (val: string) => any }>) {
  const metadata: Record<string, any> = {};
  
  // Apply each regex pattern and extract the value
  for (const [field, { regex, parser }] of Object.entries(patterns)) {
    const match = chunk.text.match(regex);
    metadata[field] = match ? parser(match[1]) : null;
  }
  
  return metadata;
}

/**
 * Get pattern definitions for product data
 * @returns Object with regex patterns for product fields
 */
function getProductPatterns() {
  return {
    price: { 
      regex: /"price":(\d+\.\d+)/, 
      parser: (val: string) => parseFloat(val) 
    },
    stock: { 
      regex: /"stock_quantity":(\d+)/, 
      parser: (val: string) => parseInt(val) 
    },
    category: { 
      regex: /"category":"([^"]+)"/, 
      parser: (val: string) => val 
    },
  };
}

/**
 * Get pattern definitions for customer data
 * @returns Object with regex patterns for customer fields
 */
function getCustomerPatterns() {
  return {
    email: { 
      regex: /"email":"([^"]+)"/, 
      parser: (val: string) => val 
    },
    loyaltyPoints: { 
      regex: /"loyalty_points":(\d+)/, 
      parser: (val: string) => parseInt(val) 
    }
  };
}

/**
 * Get pattern definitions for order data
 * @returns Object with regex patterns for order fields
 */
function getOrderPatterns() {
  return {
    customerId: { 
      regex: /"customer_id":"([^"]+)"/, 
      parser: (val: string) => val 
    },
    status: { 
      regex: /"status":"([^"]+)"/, 
      parser: (val: string) => val 
    },
    totalAmount: { 
      regex: /"total_amount":(\d+\.\d+)/, 
      parser: (val: string) => parseFloat(val) 
    },
  };
}

/**
 * Process chunks and extract metadata based on data type
 * @param chunks Array of document chunks
 * @param patterns Object with regex patterns for field extraction
 * @returns The processed chunks with enhanced metadata
 */
function processChunksWithMetadata(chunks: any[], patterns: Record<string, { regex: RegExp, parser: (val: string) => any }>) {
  for (const chunk of chunks) {
    const extractedData = extractMetadataFromChunk(chunk, patterns);

    chunk.metadata = {
      ...chunk.metadata,
      ...extractedData
    };

  }

  return chunks;
}

const currentFilePath = fileURLToPath(import.meta.url);
const currentDir = path.dirname(currentFilePath);
const projectRoot = path.resolve(currentDir, '../..');

async function upsertDocuments() {
  const docsDir = path.join(projectRoot, "src", "documents");

  const markdownDocs = [
    {
      path: path.join(docsDir, "auth.md"),
      type: "documentation",
      section: "authentication",
    },
    {
      path: path.join(docsDir, "error-handling.md"),
      type: "documentation",
      section: "error-handling",
    },
    {
      path: path.join(docsDir, "logging.md"),
      type: "documentation",
      section: "logging",
    },
  ];

  const markdownContents = await Promise.all(
    markdownDocs.map(async (doc) => ({
      text: await fs.readFile(doc.path, "utf-8"),
      metadata: {
        source: path.basename(doc.path),
        type: doc.type,
        section: doc.section,
        format: "markdown",
      },
    }))
  );

  const markdownDoc = new MDocument({
    docs: markdownContents,
    type: "markdown",
  });

  await markdownDoc.chunk({
    strategy: "markdown",
    headers: [
      ["#", "Header 1"],
      ["##", "Header 2"],
    ],
    maxSize: 1500, // Large enough for complete code examples
    minSize: 500, // Small enough to be specific but meaningful
    overlap: 100, // Enough to maintain context between chunks
  });


  const markdownChunks = markdownDoc.getDocs();

  const { embeddings } = await embedMany({
    model: openai.embedding("text-embedding-3-small"),
    values: markdownChunks.map((chunk) => chunk.text),
  });

  const vector = mastra.getVector("default");
  await vector.deleteIndex("kitchenSink");
  await vector.createIndex({
    indexName: "kitchenSink",
    dimension: 1536,
  });

  await vector.upsert({
    indexName: "kitchenSink",
    vectors: embeddings,
    metadata: markdownChunks.map((chunk) => ({
      ...chunk.metadata,
      text: chunk.text,
    })),
  });

  const retailStoreData = [
    {
      text: JSON.stringify(company),
      metadata: {
        source: 'retail-store.ts',
        type: 'retail-data',
        section: 'company',
        format: 'json'
      }
    },
    {
      text: JSON.stringify(products),
      metadata: {
        source: 'retail-store.ts',
        type: 'retail-data',
        section: 'products',
        format: 'json'
      }
    },
    // {
    //   text: JSON.stringify(customers),
    //   metadata: {
    //     source: 'retail-store.ts',
    //     type: 'retail-data',
    //     section: 'customers',
    //     format: 'json'
    //   }
    // },
    // {
    //   text: JSON.stringify(orders),
    //   metadata: {
    //     source: 'retail-store.ts',
    //     type: 'retail-data',
    //     section: 'orders',
    //     format: 'json'
    //   }
    // },
    // {
    //   text: JSON.stringify(stores),
    //   metadata: {
    //     source: 'retail-store.ts',
    //     type: 'retail-data',
    //     section: 'stores',
    //     format: 'json'
    //   }
    // },
    // {
    //   text: JSON.stringify(inventory),
    //   metadata: {
    //     source: 'retail-store.ts',
    //     type: 'retail-data',
    //     section: 'inventory',
    //     format: 'json'
    //   }
    // },
    // {
    //   text: JSON.stringify(promotions),
    //   metadata: {
    //     source: 'retail-store.ts',
    //     type: 'retail-data',
    //     section: 'promotions',
    //     format: 'json'
    //   }
    // },
    // {
    //   text: JSON.stringify(categories),
    //   metadata: {
    //     source: 'retail-store.ts',
    //     type: 'retail-data',
    //     section: 'categories',
    //     format: 'json'
    //   }
    // },
    // {
    //   text: JSON.stringify(reviews),
    //   metadata: {
    //     source: 'retail-store.ts',
    //     type: 'retail-data',
    //     section: 'reviews',
    //     format: 'json'
    //   }
    // }
  ];

  for (const data of retailStoreData) {
    const doc = new MDocument({
      docs: [data],
      type: "json",
    });

    const chunks = await doc.chunk({
      strategy: "json",
      maxSize: 1500,
      minSize: 500,
      overlap: 100,
    });
  
    switch (data.metadata.section) {
      case 'products':
        processChunksWithMetadata(
          chunks,
          getProductPatterns()
        );
        break;
        
      case 'customers':
        processChunksWithMetadata(
          chunks,
          getCustomerPatterns()
        );
        break;
        
      case 'orders':
        processChunksWithMetadata(
          chunks,
          getOrderPatterns()
        );
        break;
    }

    const { embeddings } = await embedMany({
      model: openai.embedding("text-embedding-3-small"),
      values: chunks.map((chunk) => chunk.text),
    });

    const vector = mastra.getVector("default");
    await vector.deleteIndex("kitchenSink");
    await vector.createIndex({
      indexName: "kitchenSink",
      dimension: 1536,
    });

    await vector.upsert({
      indexName: "kitchenSink",
      vectors: embeddings,
      metadata: chunks.map((chunk) => ({
        ...chunk.metadata,
        text: chunk.text,
      })),
    });
  }

  console.log(`Successfully upserted document chunks`);
}

upsertDocuments().catch(console.error);