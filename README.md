# SmritiAI 🧠
[🦊Get on Firefox store](https://addons.mozilla.org/en-US/firefox/addon/smritiai/)

**Search Your Browser History with AI**

SmritiAI is a Firefox browser extension that uses AI-powered semantic search to help you find web pages from your browsing history. Instead of remembering exact keywords, you can search using natural language descriptions and find relevant pages based on their content.

## ✨ Features

- **🔍 AI-Powered Semantic Search**: Search your browsing history using natural language queries
- **🌐 Domain Filtering**: Filter search results by specific domains or exclude unwanted sites
- **📄 Content Analysis**: Automatically extracts and analyzes webpage content using Mozilla's Readability
- **⚡ Fast Vector Search**: Uses HNSW (Hierarchical Navigable Small World) algorithm for efficient similarity search
- **🎨 Modern UI**: Clean, responsive sidebar interface with dark/light theme support
- **📊 Index Management**: Tools to rebuild, export, and manage your search index
- **📈 Browser History Processing**: Process your existing browser history to make it searchable with AI
- **⚙️ Customizable Settings**: Adjust search parameters and indexing behavior
- **🔒 Privacy-First**: All processing happens locally in your browser

## 🏗️ Architecture

### Core Components

1. **Background Script** (`src/background/`)
   - **background.js**: Main entry point and AI pipeline management
   - **handlers/**: Specialized message handlers for different operations
     - `message-router.js`: Routes messages to appropriate handlers
     - `search-handler.js`: Processes search queries and returns results
     - `page-processor.js`: Handles new page indexing and content processing
     - `history-processor.js`: Batch processes browser history
     - `data-handler.js`: Manages data export/import operations
     - `settings-handler.js`: Handles settings updates and retrieval
   - **services/**: Core business logic services
