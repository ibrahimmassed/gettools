class ToolBoxApp {
    constructor() {
        this.tools = [];
        this.currentTool = null;
        this.theme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.applyTheme();
        this.loadTools();
        this.renderTools();
        this.handleRouting();
    }

    setupEventListeners() {
        // Search functionality
        document.getElementById('searchInput').addEventListener('input', (e) => {
            this.filterTools(e.target.value);
        });

        // Theme toggle
        document.getElementById('themeToggle').addEventListener('click', () => {
            this.toggleTheme();
        });
        // NEW: Listen for URL changes (Back button, Forward button, Manual URL change)
       window.addEventListener('hashchange', () => {
            this.handleRouting();
        });
       // UPDATE: Modal controls
        document.getElementById('closeModal').addEventListener('click', () => {
            this.closeModal();
        });

        document.getElementById('toolModal').addEventListener('click', (e) => {
            if (e.target.id === 'toolModal') {
                this.closeModal();
            }
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });
    }

    loadTools() {
        this.tools = [
            {
               id: 'password-generator',
               name: 'Password Generator',
               description: 'Generate secure passwords...',
               icon: '🔐',
               category: 'Security',
               component: 'PasswordGenerator',
               url: 'password-generator.html' // <--- New Line
            },
            {
                id: 'text-capitalizer',
                name: 'Text Capitalizer',
                description: 'Convert text to different cases',
                icon: '📝',
                category: 'Text',
                component: 'TextCapitalizer'
            },
            {
               id: 'qr-generator',
               name: 'QR Code Generator',
               description: 'Create QR codes for any text or URL',
               icon: '📱',
               category: 'Generators',
               component: 'QRGenerator',
               url: 'qr-code-generator.html' // <--- Add this line
            },
            {
                id: 'color-picker',
                name: 'Color Picker',
                description: 'Pick colors and convert between formats',
                icon: '🎨',
                category: 'Design',
                component: 'ColorPicker'
            },
            {
                id: 'unit-converter',
                name: 'Unit Converter',
                description: 'Convert between different units',
                icon: '📏',
                category: 'Calculators',
                component: 'UnitConverter'
            },
            {
                id: 'stopwatch',
                name: 'Stopwatch & Timer',
                description: 'Track time with precision',
                icon: '⏱️',
                category: 'Time',
                component: 'Stopwatch'
            },
            {
                id: 'notepad',
                name: 'Notepad',
                description: 'Simple text editor with auto-save',
                icon: '📄',
                category: 'Text',
                component: 'Notepad'
            },
            {
                id: 'json-formatter',
                name: 'JSON Formatter',
                description: 'Format and validate JSON data',
                icon: '{ }',
                category: 'Development',
                component: 'JSONFormatter'
            },
            {
                id: 'word-counter',
                name: 'Word Counter',
                description: 'Count characters, words, and paragraphs',
                icon: '📊',
                category: 'Text',
                component: 'WordCounter'
            },
            {
               id: 'dice-roller',
               name: 'Dice Roller',
               description: 'Roll dice and flip coins',
               icon: '🎲',
               category: 'Games',
               component: 'DiceRoller',
               url: 'dice-roller.html' // <--- Add this line
            },
            {
                id: 'age-calculator',
                name: 'Age Calculator',
                description: 'Calculate age and time differences',
                icon: '🎂',
                category: 'Calculators',
                component: 'AgeCalculator'
            },
            {
                id: 'tip-calculator',
                name: 'Tip Calculator',
                description: 'Calculate tips and split bills',
                icon: '💰',
                category: 'Calculators',
                component: 'TipCalculator'
            },
            {
                id: 'text-reverser',
                name: 'Text Reverser',
                description: 'Reverse and flip text',
                icon: '🔄',
                category: 'Text',
                component: 'TextReverser'
            },
            {
                id: 'number-converter',
                name: 'Number to Words',
                description: 'Convert numbers to written words',
                icon: '🔢',
                category: 'Converters',
                component: 'NumberConverter'
            },
            {
                id: 'typing-test',
                name: 'Typing Speed Test',
                description: 'Test your typing speed and accuracy',
                icon: '⌨️',
                category: 'Games',
                component: 'TypingTest'
            },
            {
                id: 'luck-wheel',
                name: 'Luck Wheel',
                description: 'Spin the wheel of fortune',
                icon: '🎡',
                category: 'Games',
                component: 'LuckWheel'
            },
            {
                id: 'timezone-converter',
                name: 'Timezone Converter',
                description: 'Convert time between timezones',
                icon: '🌍',
                category: 'Time',
                component: 'TimezoneConverter'
            },
            {
                id: 'html-editor',
                name: 'HTML Editor',
                description: 'Edit and preview HTML code',
                icon: '🌐',
                category: 'Development',
                component: 'HTMLEditor'
            },
            {
                id: 'color-palette',
                name: 'Color Palette Generator',
                description: 'Generate beautiful color palettes',
                icon: '🎨',
                category: 'Design',
                component: 'ColorPalette'
            },
            {
                id: 'whiteboard',
                name: 'Whiteboard',
                description: 'Digital drawing canvas',
                icon: '🖼️',
                category: 'Design',
                component: 'Whiteboard'
            }
        ];
    }
  handleRouting() {
        // Get the hash without the '#' character
        const hash = window.location.hash.slice(1);

        if (!hash) {
            // If no hash, ensure modal is closed
            if (!document.getElementById('toolModal').classList.contains('hidden')) {
                this.closeModal();
            }
            return;
        }

        // Find the tool that matches the hash
        const tool = this.tools.find(t => t.id === hash);
        
        if (tool) {
            // Open the tool (UI only)
            this.openTool(tool);
        }
    }
    renderTools() {
        const grid = document.getElementById('toolsGrid');
        grid.innerHTML = '';

        this.tools.forEach((tool, index) => {
            const toolCard = document.createElement('div');
            toolCard.className = 'tool-card bg-white rounded-lg shadow-md overflow-hidden cursor-pointer fade-in';
            toolCard.style.animationDelay = `${index * 0.1}s`;
            
            toolCard.innerHTML = `
                <div class="p-6">
                    <div class="flex items-center mb-4">
                        <span class="text-3xl mr-3">${tool.icon}</span>
                        <div>
                            <h3 class="text-xl font-semibold text-gray-900">${tool.name}</h3>
                            <span class="text-sm text-primary font-medium">${tool.category}</span>
                        </div>
                    </div>
                    <p class="text-gray-600 mb-4">${tool.description}</p>
                    <div class="flex justify-between items-center">
                        <span class="text-sm text-gray-500">Click to open</span>
                        <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                        </svg>
                    </div>
                </div>
            `;

          toolCard.addEventListener('click', () => {
                if (tool.url) {
                    // If it's a special page, go there directly
                    window.location.href = tool.url;
                } else {
                    // Otherwise use the hash/modal system
                    window.location.hash = tool.id;
                }
            });

            grid.appendChild(toolCard);
        });
    }

    filterTools(query) {
        const cards = document.querySelectorAll('.tool-card');
        
        cards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            const category = card.querySelector('.text-primary').textContent.toLowerCase();
            
            if (title.includes(query.toLowerCase()) || 
                description.includes(query.toLowerCase()) || 
                category.includes(query.toLowerCase())) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    openTool(tool) {
        this.currentTool = tool;
        document.getElementById('modalTitle').textContent = tool.name;
        document.getElementById('toolModal').classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        
        // Load tool component
        this.loadToolComponent(tool);
    }

    closeModal() {
        
        if (window.location.hash) {
            window.location.hash = ''; 
            return;
        }
        document.getElementById('toolModal').classList.add('hidden');
        document.body.style.overflow = 'auto';
        this.currentTool = null;
    }

    loadToolComponent(tool) {
        const content = document.getElementById('modalContent');
        
        // Show loading state
        content.innerHTML = `
            <div class="flex items-center justify-center py-12">
                <div class="spinner"></div>
                <span class="ml-2 text-gray-600">Loading ${tool.name}...</span>
            </div>
        `;

        // Load component after a short delay to show loading state
        setTimeout(() => {
            if (window.ToolComponents && window.ToolComponents[tool.component]) {
                const component = new window.ToolComponents[tool.component]();
                content.innerHTML = component.render();
                component.init();
            } else {
                content.innerHTML = `
                    <div class="text-center py-12">
                        <div class="text-gray-500 mb-4">
                            <svg class="h-16 w-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 8.172V5L8 4z"/>
                            </svg>
                        </div>
                        <h3 class="text-xl font-semibold text-gray-900 mb-2">${tool.name}</h3>
                        <p class="text-gray-600 mb-4">${tool.description}</p>
                        <p class="text-sm text-gray-500">This tool is coming soon!</p>
                    </div>
                `;
            }
        }, 500);
    }

      toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', this.theme);
        this.applyTheme();
    }

    applyTheme() {
        const body = document.body;
        const themeToggle = document.getElementById('themeToggle');
        
        if (this.theme === 'dark') {
            body.classList.add('dark');
            body.style.backgroundColor = '#1f2937';
            body.style.color = '#f9fafb';
            if (themeToggle) themeToggle.textContent = '☀️';
            
            // Apply dark theme to other elements
            const header = document.querySelector('header');
            if (header) {
                header.style.backgroundColor = '#374151';
                header.style.borderColor = '#4b5563';
            }
            
            const cards = document.querySelectorAll('.tool-card');
            cards.forEach(card => {
                card.style.backgroundColor = '#374151';
                card.style.color = '#f9fafb';
            });
            
            const modal = document.querySelector('#toolModal .bg-white');
            if (modal) {
                modal.style.backgroundColor = '#374151';
                modal.style.color = '#f9fafb';
            }
            
        } else {
            body.classList.remove('dark');
            body.style.backgroundColor = '#f9fafb';
            body.style.color = '#111827';
            if (themeToggle) themeToggle.textContent = '🌙';
            
            // Reset light theme
            const header = document.querySelector('header');
            if (header) {
                header.style.backgroundColor = '#ffffff';
                header.style.borderColor = '#e5e7eb';
            }
            
            const cards = document.querySelectorAll('.tool-card');
            cards.forEach(card => {
                card.style.backgroundColor = '#ffffff';
                card.style.color = '#111827';
            });
            
            const modal = document.querySelector('#toolModal .bg-white');
            if (modal) {
                modal.style.backgroundColor = '#ffffff';
                modal.style.color = '#111827';
            }
        }
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ToolBoxApp();
});
