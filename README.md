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
     - `embedding-service.js`: AI model management and embedding generation
      - **utils/**: Shared utility functions
     - `message-helpers.js`: Async message handling wrappers
     - `domain-filter.js`: Domain filtering logic and utilities

2. **User Interface** (`src/sidebar/`)
   - **sidebar.js**: Main UI entry point and initialization
   - **components/**: Modular UI components
     - `chat-interface.js`: Search interface and message display
     - `command-system.js`: Slash command processing
     - `domain-filter.js`: Domain filtering UI and functionality
     - `settings-modal.js`: Settings configuration UI
     - `confirmation-modal.js`: Action confirmation dialogs
     - `header-dropdown.js`: Main navigation dropdown
     - `theme-manager.js`: Dark/light theme management
   - **handlers/**: UI-specific handlers
     - `first-time-handler.js`: Welcome experience for new users
     - `stats-handler.js`: Index statistics display
     - `data-handler.js`: Data export/import UI logic
   - **services/**: UI services
     - `message-service.js`: Communication with background script
   - **utils/**: UI utility functions for DOM and storage operations

3. **Content Script** (`src/content.js`)
   - Extracts readable content from web pages using Mozilla Readability
   - Sends processed content to background script for indexing

4. **Database Layer** (`src/db.js`)
   - Uses Dexie (IndexedDB wrapper) for local data storage
   - Stores page metadata and embeddings
   - Handles unique URL constraints and updates

5. **Search Engine** (`src/search.js`)
   - Implements HNSW vector search algorithm
   - Provides semantic similarity search capabilities
   - Handles index management and rebuilding

### Technology Stack

- **AI/ML**: @xenova/transformers (Transformer.js) with all-MiniLM-L6-v2 model
- **Vector Search**: hnswlib-wasm for efficient similarity search
- **Database**: Dexie (IndexedDB) for local storage
- **Content Extraction**: @mozilla/readability
- **Build Tool**: Vite with web extension plugin
- **UI**: Vanilla JavaScript with modern CSS
- **Architecture**: Modular ES6 modules with clear separation of concerns

### Modular Architecture Benefits

- **Maintainability**: Each module has a single responsibility and clear interface
- **Testability**: Components can be tested in isolation
- **Scalability**: Easy to add new features without touching existing code
- **Code Organization**: Related functionality grouped together
- **Performance**: Only load required modules when needed

## 🚀 Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Firefox browser

### Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/PranavInani/SmritiAI.git
   cd SmritiAI
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build the extension**
   ```bash
   npm run build
   ```

4. **Load in Firefox**
   - Open Firefox
   - Go to `about:debugging`
   - Click "This Firefox"
   - Click "Load Temporary Add-on"
   - Select the `manifest.json` file from the `dist` folder

### Development Mode

For development with hot reload:
```bash
npm run dev
```

## 📖 Usage

### Basic Search

1. Click the SmritiAI icon in your browser toolbar or use `Ctrl+E`
2. Type your search query in natural language
3. View results with clickable links to your previously visited pages

### First-Time Setup

When you first install SmritiAI, you'll see a welcome message offering to process your existing browser history. This will:

- Generate AI embeddings for your past browsing history
- Make your entire browsing history searchable with semantic search
- Allow you to choose how far back to process (last week, month, year, etc.)

You can skip this step and process your history later from the settings.

### Slash Commands

- `/clear` - Clear chat history
