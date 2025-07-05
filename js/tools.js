// Tool Components
window.ToolComponents = {};

// Password Generator
window.ToolComponents.PasswordGenerator = class {
    constructor() {
        this.settings = {
            length: 12,
            uppercase: true,
            lowercase: true,
            numbers: true,
            symbols: false,
            excludeSimilar: true
        };
    }

    render() {
        return `
            <div class="space-y-6">
                <div class="bg-gray-50 p-4 rounded-lg">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Generated Password</label>
                    <div class="flex items-center space-x-2">
                        <input type="text" id="generatedPassword" class="flex-1 px-3 py-2 border border-gray-300 rounded-md font-mono text-lg bg-white" readonly>
                        <button id="copyPassword" class="px-4 py-2 bg-primary text-white rounded-md hover:bg-purple-700 transition-colors">
                            Copy
                        </button>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            Password Length: <span id="lengthValue">${this.settings.length}</span>
                        </label>
                        <input type="range" id="lengthSlider" min="4" max="50" value="${this.settings.length}" class="w-full">
                    </div>

                    <div class="space-y-4">
                        <div class="flex items-center">
                            <input type="checkbox" id="uppercase" ${this.settings.uppercase ? 'checked' : ''} class="mr-2">
                            <label for="uppercase" class="text-sm text-gray-700">Uppercase Letters (A-Z)</label>
                        </div>
                        <div class="flex items-center">
                            <input type="checkbox" id="lowercase" ${this.settings.lowercase ? 'checked' : ''} class="mr-2">
                            <label for="lowercase" class="text-sm text-gray-700">Lowercase Letters (a-z)</label>
                        </div>
                        <div class="flex items-center">
                            <input type="checkbox" id="numbers" ${this.settings.numbers ? 'checked' : ''} class="mr-2">
                            <label for="numbers" class="text-sm text-gray-700">Numbers (0-9)</label>
                        </div>
                        <div class="flex items-center">
                            <input type="checkbox" id="symbols" ${this.settings.symbols ? 'checked' : ''} class="mr-2">
                            <label for="symbols" class="text-sm text-gray-700">Symbols (!@#$%^&*)</label>
                        </div>
                        <div class="flex items-center">
                            <input type="checkbox" id="excludeSimilar" ${this.settings.excludeSimilar ? 'checked' : ''} class="mr-2">
                            <label for="excludeSimilar" class="text-sm text-gray-700">Exclude Similar Characters</label>
                        </div>
                    </div>
                </div>

                <div class="flex justify-center">
                    <button id="generatePassword" class="px-6 py-3 bg-primary text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold">
                        Generate New Password
                    </button>
                </div>
            </div>
        `;
    }

    init() {
        this.generatePassword();
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.getElementById('generatePassword').addEventListener('click', () => {
            this.generatePassword();
        });

        document.getElementById('copyPassword').addEventListener('click', () => {
            this.copyToClipboard();
        });

        document.getElementById('lengthSlider').addEventListener('input', (e) => {
            this.settings.length = parseInt(e.target.value);
            document.getElementById('lengthValue').textContent = this.settings.length;
            this.generatePassword();
        });

        ['uppercase', 'lowercase', 'numbers', 'symbols', 'excludeSimilar'].forEach(id => {
            document.getElementById(id).addEventListener('change', (e) => {
                this.settings[id] = e.target.checked;
                this.generatePassword();
            });
        });
    }

    generatePassword() {
        const chars = {
            uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            lowercase: 'abcdefghijklmnopqrstuvwxyz',
            numbers: '0123456789',
            symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
        };

        const similar = 'il1Lo0O';
        let charset = '';

        Object.keys(chars).forEach(key => {
            if (this.settings[key]) {
                charset += chars[key];
            }
        });

        if (this.settings.excludeSimilar) {
            charset = charset.split('').filter(char => !similar.includes(char)).join('');
        }

        let password = '';
        for (let i = 0; i < this.settings.length; i++) {
            password += charset.charAt(Math.floor(Math.random() * charset.length));
        }

        document.getElementById('generatedPassword').value = password;
    }

    copyToClipboard() {
        const passwordInput = document.getElementById('generatedPassword');
        passwordInput.select();
        document.execCommand('copy');
        
        const button = document.getElementById('copyPassword');
        const originalText = button.textContent;
        button.textContent = 'Copied!';
        button.className = button.className.replace('bg-primary', 'bg-success');
        
        setTimeout(() => {
            button.textContent = originalText;
            button.className = button.className.replace('bg-success', 'bg-primary');
        }, 2000);
    }
};

// Text Capitalizer
window.ToolComponents.TextCapitalizer = class {
    render() {
        return `
            <div class="space-y-6">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Input Text</label>
                    <textarea id="inputText" placeholder="Enter your text here..." class="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"></textarea>
                </div>

                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <button id="upperCase" class="px-4 py-2 bg-primary text-white rounded-md hover:bg-purple-700 transition-colors">
                        UPPERCASE
                    </button>
                    <button id="lowerCase" class="px-4 py-2 bg-secondary text-white rounded-md hover:bg-blue-700 transition-colors">
                        lowercase
                    </button>
                    <button id="titleCase" class="px-4 py-2 bg-accent text-white rounded-md hover:bg-green-700 transition-colors">
                        Title Case
                    </button>
                    <button id="sentenceCase" class="px-4 py-2 bg-warning text-white rounded-md hover:bg-yellow-600 transition-colors">
                        Sentence case
                    </button>
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Output</label>
                    <textarea id="outputText" class="w-full h-32 px-3 py-2 border border-gray-300 rounded-md bg-gray-50" readonly></textarea>
                </div>

                <div class="flex justify-center">
                    <button id="copyOutput" class="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors">
                        Copy Output
                    </button>
                </div>
            </div>
        `;
    }

    init() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.getElementById('upperCase').addEventListener('click', () => {
            this.transformText('upper');
        });

        document.getElementById('lowerCase').addEventListener('click', () => {
            this.transformText('lower');
        });

        document.getElementById('titleCase').addEventListener('click', () => {
            this.transformText('title');
        });

        document.getElementById('sentenceCase').addEventListener('click', () => {
            this.transformText('sentence');
        });

        document.getElementById('copyOutput').addEventListener('click', () => {
            this.copyOutput();
        });
    }

    transformText(type) {
        const input = document.getElementById('inputText').value;
        const output = document.getElementById('outputText');
        
        switch (type) {
            case 'upper':
                output.value = input.toUpperCase();
                break;
            case 'lower':
                output.value = input.toLowerCase();
                break;
            case 'title':
                output.value = input.replace(/\w\S*/g, (txt) => 
                    txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
                );
                break;
            case 'sentence':
                output.value = input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
                break;
        }
    }

    copyOutput() {
        const outputText = document.getElementById('outputText');
        outputText.select();
        document.execCommand('copy');
        
        const button = document.getElementById('copyOutput');
        const originalText = button.textContent;
        button.textContent = 'Copied!';
        
        setTimeout(() => {
            button.textContent = originalText;
        }, 2000);
    }
};

// QR Code Generator
window.ToolComponents = window.ToolComponents || {};

window.ToolComponents.QRGenerator = class {
    render() {
        return `
            <div class="space-y-6">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Text or URL</label>
                    <textarea id="qrInput" placeholder="Enter text or URL to generate QR code..." class="w-full h-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"></textarea>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Size</label>
                        <select id="qrSize" class="w-full px-3 py-2 border border-gray-300 rounded-md">
                            <option value="200">200x200</option>
                            <option value="300" selected>300x300</option>
                            <option value="400">400x400</option>
                            <option value="500">500x500</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Error Correction</label>
                        <select id="qrErrorCorrection" class="w-full px-3 py-2 border border-gray-300 rounded-md">
                            <option value="L">Low</option>
                            <option value="M" selected>Medium</option>
                            <option value="Q">Quartile</option>
                            <option value="H">High</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Format</label>
                        <select id="qrFormat" class="w-full px-3 py-2 border border-gray-300 rounded-md">
                            <option value="png" selected>PNG</option>
                            <option value="svg">SVG</option>
                        </select>
                    </div>
                </div>

                <div class="flex justify-center">
                    <button id="generateQR" class="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold">
                        Generate QR Code
                    </button>
                </div>

                <div id="qrResult" class="text-center hidden">
                    <div class="bg-gray-50 p-6 rounded-lg">
                        <div id="qrCode" class="inline-block"></div>
                        <div class="mt-4">
                            <button id="downloadQR" class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                                Download QR Code
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    init() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.getElementById('generateQR').addEventListener('click', () => this.generateQR());
        document.getElementById('qrInput').addEventListener('input', () => {
            if (document.getElementById('qrInput').value.trim()) {
                this.generateQR();
            }
        });
    }

    generateQR() {
        const input = document.getElementById('qrInput').value.trim();
        if (!input) return;

        const size = parseInt(document.getElementById('qrSize').value);
        const errorCorrection = document.getElementById('qrErrorCorrection').value;
        const format = document.getElementById('qrFormat').value;

        const qrCodeContainer = document.getElementById('qrCode');
        qrCodeContainer.innerHTML = '';

        const qr = new QRCode(qrCodeContainer, {
            text: input,
            width: size,
            height: size,
            correctLevel: QRCode.CorrectLevel[errorCorrection]
        });

        document.getElementById('qrResult').classList.remove('hidden');

        setTimeout(() => {
            const img = qrCodeContainer.querySelector('img');
            const canvas = qrCodeContainer.querySelector('canvas');
            const target = img || canvas;

            document.getElementById('downloadQR').onclick = () => {
                const link = document.createElement('a');
                link.download = `qrcode.${format}`;
                link.href = target.src || target.toDataURL(`image/${format}`);
                link.click();
            };
        }, 300); // Wait for QRCode.js to render
    }
};


// Color Picker
window.ToolComponents.ColorPicker = class {
    constructor() {
        this.currentColor = '#8B5CF6';
    }

    render() {
        return `
            <div class="space-y-6">
                <div class="text-center">
                    <input type="color" id="colorPicker" value="${this.currentColor}" class="w-32 h-32 border-none rounded-lg cursor-pointer mx-auto">
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">HEX</label>
                            <input type="text" id="hexInput" value="${this.currentColor}" class="w-full px-3 py-2 border border-gray-300 rounded-md font-mono">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">RGB</label>
                            <input type="text" id="rgbInput" class="w-full px-3 py-2 border border-gray-300 rounded-md font-mono" readonly>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">HSL</label>
                            <input type="text" id="hslInput" class="w-full px-3 py-2 border border-gray-300 rounded-md font-mono" readonly>
                        </div>
                    </div>

                    <div class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Color Preview</label>
                            <div id="colorPreview" class="w-full h-32 rounded-lg border border-gray-300" style="background-color: ${this.currentColor}"></div>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Shades</label>
                            <div id="colorShades" class="grid grid-cols-5 gap-2"></div>
                        </div>
                    </div>
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Color History</label>
                    <div id="colorHistory" class="flex flex-wrap gap-2"></div>
                </div>
            </div>
        `;
    }

    init() {
        this.updateColorFormats();
        this.generateShades();
        this.loadColorHistory();
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.getElementById('colorPicker').addEventListener('input', (e) => {
            this.currentColor = e.target.value;
            this.updateColorFormats();
            this.generateShades();
            this.saveToHistory();
        });

        document.getElementById('hexInput').addEventListener('input', (e) => {
            const hex = e.target.value;
            if (this.isValidHex(hex)) {
                this.currentColor = hex;
                document.getElementById('colorPicker').value = hex;
                this.updateColorFormats();
                this.generateShades();
            }
        });
    }

    updateColorFormats() {
        const rgb = this.hexToRgb(this.currentColor);
        const hsl = this.rgbToHsl(rgb.r, rgb.g, rgb.b);
        
        document.getElementById('hexInput').value = this.currentColor;
        document.getElementById('rgbInput').value = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
        document.getElementById('hslInput').value = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
        document.getElementById('colorPreview').style.backgroundColor = this.currentColor;
    }

    generateShades() {
        const shadesContainer = document.getElementById('colorShades');
        shadesContainer.innerHTML = '';
        
        const baseColor = this.hexToRgb(this.currentColor);
        const shades = [-0.8, -0.4, 0, 0.4, 0.8];
        
        shades.forEach(shade => {
            const r = Math.round(baseColor.r + (255 - baseColor.r) * shade);
            const g = Math.round(baseColor.g + (255 - baseColor.g) * shade);
            const b = Math.round(baseColor.b + (255 - baseColor.b) * shade);
            
            const shadeHex = this.rgbToHex(r, g, b);
            
            const shadeDiv = document.createElement('div');
            shadeDiv.className = 'w-full h-12 rounded cursor-pointer border border-gray-300 hover:scale-105 transition-transform';
            shadeDiv.style.backgroundColor = shadeHex;
            shadeDiv.title = shadeHex;
            
            shadeDiv.addEventListener('click', () => {
                this.currentColor = shadeHex;
                document.getElementById('colorPicker').value = shadeHex;
                this.updateColorFormats();
                this.generateShades();
            });
            
            shadesContainer.appendChild(shadeDiv);
        });
    }

    saveToHistory() {
        let history = JSON.parse(localStorage.getItem('colorHistory') || '[]');
        if (!history.includes(this.currentColor)) {
            history.unshift(this.currentColor);
            history = history.slice(0, 10); // Keep only last 10 colors
            localStorage.setItem('colorHistory', JSON.stringify(history));
            this.loadColorHistory();
        }
    }

    loadColorHistory() {
        const history = JSON.parse(localStorage.getItem('colorHistory') || '[]');
        const historyContainer = document.getElementById('colorHistory');
        historyContainer.innerHTML = '';
        
        history.forEach(color => {
            const colorDiv = document.createElement('div');
            colorDiv.className = 'w-12 h-12 rounded cursor-pointer border border-gray-300 hover:scale-105 transition-transform';
            colorDiv.style.backgroundColor = color;
            colorDiv.title = color;
            
            colorDiv.addEventListener('click', () => {
                this.currentColor = color;
                document.getElementById('colorPicker').value = color;
                this.updateColorFormats();
                this.generateShades();
            });
            
            historyContainer.appendChild(colorDiv);
        });
    }

    isValidHex(hex) {
        return /^#[0-9A-F]{6}$/i.test(hex);
    }

    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    rgbToHex(r, g, b) {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }

    rgbToHsl(r, g, b) {
        r /= 255;
        g /= 255;
        b /= 255;
        
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;
        
        if (max === min) {
            h = s = 0;
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }
        
        return {
            h: Math.round(h * 360),
            s: Math.round(s * 100),
            l: Math.round(l * 100)
        };
    }
};

// Unit Converter
window.ToolComponents.UnitConverter = class {
    constructor() {
        this.conversions = {
            length: {
                name: 'Length',
                units: {
                    meter: { name: 'Meter', factor: 1 },
                    kilometer: { name: 'Kilometer', factor: 1000 },
                    centimeter: { name: 'Centimeter', factor: 0.01 },
                    millimeter: { name: 'Millimeter', factor: 0.001 },
                    inch: { name: 'Inch', factor: 0.0254 },
                    foot: { name: 'Foot', factor: 0.3048 },
                    yard: { name: 'Yard', factor: 0.9144 },
                    mile: { name: 'Mile', factor: 1609.344 }
                }
            },
            weight: {
                name: 'Weight',
                units: {
                    kilogram: { name: 'Kilogram', factor: 1 },
                    gram: { name: 'Gram', factor: 0.001 },
                    pound: { name: 'Pound', factor: 0.453592 },
                    ounce: { name: 'Ounce', factor: 0.0283495 },
                    ton: { name: 'Ton', factor: 1000 }
                }
            },
            temperature: {
                name: 'Temperature',
                units: {
                    celsius: { name: 'Celsius' },
                    fahrenheit: { name: 'Fahrenheit' },
                    kelvin: { name: 'Kelvin' }
                }
            }
        };
    }

    render() {
        return `
            <div class="space-y-6">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Conversion Type</label>
                    <select id="conversionType" class="w-full px-3 py-2 border border-gray-300 rounded-md">
                        ${Object.entries(this.conversions).map(([key, value]) => 
                            `<option value="${key}">${value.name}</option>`
                        ).join('')}
                    </select>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">From</label>
                            <select id="fromUnit" class="w-full px-3 py-2 border border-gray-300 rounded-md mb-2">
                            </select>
                            <input type="number" id="fromValue" placeholder="Enter value" class="w-full px-3 py-2 border border-gray-300 rounded-md">
                        </div>
                    </div>

                    <div class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">To</label>
                            <select id="toUnit" class="w-full px-3 py-2 border border-gray-300 rounded-md mb-2">
                            </select>
                            <input type="number" id="toValue" class="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50" readonly>
                        </div>
                    </div>
                </div>

                <div class="text-center">
                    <button id="swapUnits" class="px-4 py-2 bg-secondary text-white rounded-md hover:bg-blue-700 transition-colors">
                        Swap Units
                    </button>
                </div>
            </div>
        `;
    }

    init() {
        this.updateUnits();
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.getElementById('conversionType').addEventListener('change', () => {
            this.updateUnits();
        });

        document.getElementById('fromValue').addEventListener('input', () => {
            this.convert();
        });

        document.getElementById('fromUnit').addEventListener('change', () => {
            this.convert();
        });

        document.getElementById('toUnit').addEventListener('change', () => {
            this.convert();
        });

        document.getElementById('swapUnits').addEventListener('click', () => {
            this.swapUnits();
        });
    }

    updateUnits() {
        const type = document.getElementById('conversionType').value;
        const units = this.conversions[type].units;
        
        const fromSelect = document.getElementById('fromUnit');
        const toSelect = document.getElementById('toUnit');
        
        fromSelect.innerHTML = '';
        toSelect.innerHTML = '';
        
        Object.entries(units).forEach(([key, unit]) => {
            const option1 = new Option(unit.name, key);
            const option2 = new Option(unit.name, key);
            fromSelect.add(option1);
            toSelect.add(option2);
        });
        
        // Set different default values
        if (toSelect.options.length > 1) {
            toSelect.selectedIndex = 1;
        }
        
        this.convert();
    }

    convert() {
        const type = document.getElementById('conversionType').value;
        const fromUnit = document.getElementById('fromUnit').value;
        const toUnit = document.getElementById('toUnit').value;
        const fromValue = parseFloat(document.getElementById('fromValue').value) || 0;
        
        let result = 0;
        
        if (type === 'temperature') {
            result = this.convertTemperature(fromValue, fromUnit, toUnit);
        } else {
            const fromFactor = this.conversions[type].units[fromUnit].factor;
            const toFactor = this.conversions[type].units[toUnit].factor;
            result = fromValue * fromFactor / toFactor;
        }
        
        document.getElementById('toValue').value = result.toFixed(6).replace(/\.?0+$/, '');
    }

    convertTemperature(value, from, to) {
        if (from === to) return value;
        
        // Convert to Celsius first
        let celsius = value;
        if (from === 'fahrenheit') {
            celsius = (value - 32) * 5/9;
        } else if (from === 'kelvin') {
            celsius = value - 273.15;
        }
        
        // Convert from Celsius to target
        if (to === 'fahrenheit') {
            return celsius * 9/5 + 32;
        } else if (to === 'kelvin') {
            return celsius + 273.15;
        }
        
        return celsius;
    }

    swapUnits() {
        const fromUnit = document.getElementById('fromUnit');
        const toUnit = document.getElementById('toUnit');
        const fromValue = document.getElementById('fromValue');
        const toValue = document.getElementById('toValue');
        
        // Swap selected units
        const tempUnit = fromUnit.value;
        fromUnit.value = toUnit.value;
        toUnit.value = tempUnit;
        
        // Swap values
        fromValue.value = toValue.value;
        
        this.convert();
    }
};

// Stopwatch
window.ToolComponents.Stopwatch = class {
    constructor() {
        this.startTime = 0;
        this.elapsedTime = 0;
        this.timerInterval = null;
        this.isRunning = false;
        this.laps = [];
    }

    render() {
        return `
            <div class="space-y-8">
                <div class="text-center">
                    <div id="stopwatchDisplay" class="text-6xl font-mono font-bold text-primary mb-8">
                        00:00:00
                    </div>
                    
                    <div class="flex justify-center space-x-4">
                        <button id="startStopBtn" class="px-6 py-3 bg-primary text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold">
                            Start
                        </button>
                        <button id="lapBtn" class="px-6 py-3 bg-secondary text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold" disabled>
                            Lap
                        </button>
                        <button id="resetBtn" class="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-semibold">
                            Reset
                        </button>
                    </div>
                </div>

                <div id="lapTimes" class="max-h-64 overflow-y-auto">
                    <h3 class="text-lg font-semibold mb-4 text-center">Lap Times</h3>
                    <div id="lapList" class="space-y-2">
                        <!-- Lap times will be added here -->
                    </div>
                </div>
            </div>
        `;
    }

    init() {
        this.setupEventListeners();
        this.updateDisplay();
    }

    setupEventListeners() {
        document.getElementById('startStopBtn').addEventListener('click', () => {
            this.toggleStopwatch();
        });

        document.getElementById('lapBtn').addEventListener('click', () => {
            this.recordLap();
        });

        document.getElementById('resetBtn').addEventListener('click', () => {
            this.resetStopwatch();
        });
    }

    toggleStopwatch() {
        if (this.isRunning) {
            this.stopStopwatch();
        } else {
            this.startStopwatch();
        }
    }

    startStopwatch() {
        this.startTime = Date.now() - this.elapsedTime;
        this.isRunning = true;
        
        this.timerInterval = setInterval(() => {
            this.elapsedTime = Date.now() - this.startTime;
            this.updateDisplay();
        }, 10);
        
        document.getElementById('startStopBtn').textContent = 'Stop';
        document.getElementById('startStopBtn').className = 'px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-semibold';
        document.getElementById('lapBtn').disabled = false;
    }

    stopStopwatch() {
        clearInterval(this.timerInterval);
        this.isRunning = false;
        
        document.getElementById('startStopBtn').textContent = 'Start';
        document.getElementById('startStopBtn').className = 'px-6 py-3 bg-primary text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold';
        document.getElementById('lapBtn').disabled = true;
    }

    resetStopwatch() {
        clearInterval(this.timerInterval);
        this.isRunning = false;
        this.elapsedTime = 0;
        this.laps = [];
        
        this.updateDisplay();
        document.getElementById('startStopBtn').textContent = 'Start';
        document.getElementById('startStopBtn').className = 'px-6 py-3 bg-primary text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold';
        document.getElementById('lapBtn').disabled = true;
        document.getElementById('lapList').innerHTML = '';
    }

    recordLap() {
        if (this.isRunning) {
            const lapTime = this.elapsedTime;
            this.laps.push(lapTime);
            
            const lapList = document.getElementById('lapList');
            const lapElement = document.createElement('div');
            lapElement.className = 'flex justify-between items-center py-2 px-4 bg-gray-50 rounded';
            lapElement.innerHTML = `
                <span class="font-semibold">Lap ${this.laps.length}</span>
                <span class="font-mono">${this.formatTime(lapTime)}</span>
            `;
            
            lapList.insertBefore(lapElement, lapList.firstChild);
        }
    }

    updateDisplay() {
        document.getElementById('stopwatchDisplay').textContent = this.formatTime(this.elapsedTime);
    }

    formatTime(milliseconds) {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        const ms = Math.floor((milliseconds % 1000) / 10);
        
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${ms.toString().padStart(2, '0')}`;
    }
};

// Notepad
window.ToolComponents.Notepad = class {
    constructor() {
        this.autoSaveInterval = null;
    }

    render() {
        return `
            <div class="space-y-4">
                <div class="flex justify-between items-center">
                    <div class="flex items-center space-x-4">
                        <input type="text" id="noteTitle" placeholder="Untitled Note" class="text-xl font-semibold bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-primary rounded px-2 py-1">
                        <span id="saveStatus" class="text-sm text-gray-500"></span>
                    </div>
                    <div class="flex space-x-2">
                        <button id="clearNote" class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors">
                            Clear
                        </button>
                        <button id="downloadNote" class="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors">
                            Download
                        </button>
                    </div>
                </div>
                
                <textarea id="noteContent" placeholder="Start writing your note here..." class="w-full h-96 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary resize-none"></textarea>
                
                <div class="flex justify-between items-center text-sm text-gray-500">
                    <span id="wordCount">0 words</span>
                    <span id="lastSaved">Never saved</span>
                </div>
            </div>
        `;
    }

    init() {
        this.loadNote();
        this.setupEventListeners();
        this.startAutoSave();
    }

    setupEventListeners() {
        document.getElementById('noteContent').addEventListener('input', () => {
            this.updateWordCount();
            this.showUnsavedStatus();
        });

        document.getElementById('noteTitle').addEventListener('input', () => {
            this.showUnsavedStatus();
        });

        document.getElementById('clearNote').addEventListener('click', () => {
            if (confirm('Are you sure you want to clear the note?')) {
                document.getElementById('noteContent').value = '';
                document.getElementById('noteTitle').value = '';
                this.saveNote();
                this.updateWordCount();
            }
        });

        document.getElementById('downloadNote').addEventListener('click', () => {
            this.downloadNote();
        });
    }

    loadNote() {
        const savedNote = localStorage.getItem('notepad-content');
        const savedTitle = localStorage.getItem('notepad-title');
        
        if (savedNote) {
            document.getElementById('noteContent').value = savedNote;
        }
        
        if (savedTitle) {
            document.getElementById('noteTitle').value = savedTitle;
        }
        
        this.updateWordCount();
        this.updateLastSaved();
    }

    saveNote() {
        const content = document.getElementById('noteContent').value;
        const title = document.getElementById('noteTitle').value;
        
        localStorage.setItem('notepad-content', content);
        localStorage.setItem('notepad-title', title);
        localStorage.setItem('notepad-last-saved', Date.now().toString());
        
        this.updateLastSaved();
        this.showSavedStatus();
    }

    startAutoSave() {
        this.autoSaveInterval = setInterval(() => {
            this.saveNote();
        }, 30000); // Auto-save every 30 seconds
    }

    updateWordCount() {
        const content = document.getElementById('noteContent').value;
        const words = content.trim().split(/\s+/).filter(word => word.length > 0);
        const wordCount = content.trim() === '' ? 0 : words.length;
        document.getElementById('wordCount').textContent = `${wordCount} words`;
    }

    updateLastSaved() {
        const lastSaved = localStorage.getItem('notepad-last-saved');
        if (lastSaved) {
            const date = new Date(parseInt(lastSaved));
            document.getElementById('lastSaved').textContent = `Last saved: ${date.toLocaleString()}`;
        }
    }

    showUnsavedStatus() {
        document.getElementById('saveStatus').textContent = 'Unsaved changes';
        document.getElementById('saveStatus').className = 'text-sm text-orange-500';
    }

    showSavedStatus() {
        document.getElementById('saveStatus').textContent = 'Saved';
        document.getElementById('saveStatus').className = 'text-sm text-green-500';
        
        setTimeout(() => {
            document.getElementById('saveStatus').textContent = '';
        }, 2000);
    }

    downloadNote() {
        const content = document.getElementById('noteContent').value;
        const title = document.getElementById('noteTitle').value || 'Untitled Note';
        
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `${title}.txt`;
        a.click();
        
        URL.revokeObjectURL(url);
    }
};

// JSON Formatter
window.ToolComponents.JSONFormatter = class {
    render() {
        return `
            <div class="space-y-6">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Input JSON</label>
                    <textarea id="jsonInput" placeholder="Paste your JSON here..." class="w-full h-48 px-3 py-2 border border-gray-300 rounded-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary"></textarea>
                </div>

                <div class="flex justify-center space-x-4">
                    <button id="formatJson" class="px-4 py-2 bg-primary text-white rounded-md hover:bg-purple-700 transition-colors">
                        Format JSON
                    </button>
                    <button id="minifyJson" class="px-4 py-2 bg-secondary text-white rounded-md hover:bg-blue-700 transition-colors">
                        Minify JSON
                    </button>
                    <button id="validateJson" class="px-4 py-2 bg-accent text-white rounded-md hover:bg-green-700 transition-colors">
                        Validate JSON
                    </button>
                </div>

                <div id="validationResult" class="hidden">
                    <div id="validationMessage" class="p-4 rounded-md"></div>
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Formatted JSON</label>
                    <textarea id="jsonOutput" class="w-full h-48 px-3 py-2 border border-gray-300 rounded-md font-mono text-sm bg-gray-50" readonly></textarea>
                </div>

                <div class="flex justify-center">
                    <button id="copyJson" class="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors">
                        Copy Formatted JSON
                    </button>
                </div>
            </div>
        `;
    }

    init() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.getElementById('formatJson').addEventListener('click', () => {
            this.formatJson();
        });

        document.getElementById('minifyJson').addEventListener('click', () => {
            this.minifyJson();
        });

        document.getElementById('validateJson').addEventListener('click', () => {
            this.validateJson();
        });

        document.getElementById('copyJson').addEventListener('click', () => {
            this.copyJson();
        });
    }

    formatJson() {
        const input = document.getElementById('jsonInput').value.trim();
        const output = document.getElementById('jsonOutput');
        
        try {
            const parsed = JSON.parse(input);
            const formatted = JSON.stringify(parsed, null, 2);
            output.value = formatted;
            this.showValidationResult(true, 'JSON is valid and formatted successfully!');
        } catch (error) {
            this.showValidationResult(false, `Invalid JSON: ${error.message}`);
        }
    }

    minifyJson() {
        const input = document.getElementById('jsonInput').value.trim();
        const output = document.getElementById('jsonOutput');
        
        try {
            const parsed = JSON.parse(input);
            const minified = JSON.stringify(parsed);
            output.value = minified;
            this.showValidationResult(true, 'JSON is valid and minified successfully!');
        } catch (error) {
            this.showValidationResult(false, `Invalid JSON: ${error.message}`);
        }
    }

    validateJson() {
        const input = document.getElementById('jsonInput').value.trim();
        
        try {
            JSON.parse(input);
            this.showValidationResult(true, 'JSON is valid!');
        } catch (error) {
            this.showValidationResult(false, `Invalid JSON: ${error.message}`);
        }
    }

    showValidationResult(isValid, message) {
        const resultDiv = document.getElementById('validationResult');
        const messageDiv = document.getElementById('validationMessage');
        
        resultDiv.classList.remove('hidden');
        messageDiv.textContent = message;
        
        if (isValid) {
            messageDiv.className = 'p-4 rounded-md bg-green-100 text-green-800 border border-green-200';
        } else {
            messageDiv.className = 'p-4 rounded-md bg-red-100 text-red-800 border border-red-200';
        }
    }

    copyJson() {
        const output = document.getElementById('jsonOutput');
        output.select();
        document.execCommand('copy');
        
        const button = document.getElementById('copyJson');
        const originalText = button.textContent;
        button.textContent = 'Copied!';
        
        setTimeout(() => {
            button.textContent = originalText;
        }, 2000);
    }
};

// Word Counter
window.ToolComponents.WordCounter = class {
    render() {
        return `
            <div class="space-y-6">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Enter your text</label>
                    <textarea id="textInput" placeholder="Start typing or paste your text here..." class="w-full h-64 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"></textarea>
                </div>

                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div class="bg-primary text-white p-4 rounded-lg text-center">
                        <div class="text-2xl font-bold" id="characterCount">0</div>
                        <div class="text-sm">Characters</div>
                    </div>
                    <div class="bg-secondary text-white p-4 rounded-lg text-center">
                        <div class="text-2xl font-bold" id="characterCountNoSpaces">0</div>
                        <div class="text-sm">Characters (no spaces)</div>
                    </div>
                    <div class="bg-accent text-white p-4 rounded-lg text-center">
                        <div class="text-2xl font-bold" id="wordCount">0</div>
                        <div class="text-sm">Words</div>
                    </div>
                    <div class="bg-warning text-white p-4 rounded-lg text-center">
                        <div class="text-2xl font-bold" id="paragraphCount">0</div>
                        <div class="text-sm">Paragraphs</div>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <h3 class="font-semibold mb-2">Reading Time</h3>
                        <div class="text-2xl font-bold text-primary" id="readingTime">0 min</div>
                    </div>
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <h3 class="font-semibold mb-2">Speaking Time</h3>
                        <div class="text-2xl font-bold text-secondary" id="speakingTime">0 min</div>
                    </div>
                </div>
            </div>
        `;
    }

    init() {
        this.setupEventListeners();
        this.updateCounts();
    }

    setupEventListeners() {
        document.getElementById('textInput').addEventListener('input', () => {
            this.updateCounts();
        });
    }

    updateCounts() {
        const text = document.getElementById('textInput').value;
        
        // Character count
        const characterCount = text.length;
        document.getElementById('characterCount').textContent = characterCount.toLocaleString();
        
        // Character count without spaces
        const characterCountNoSpaces = text.replace(/\s/g, '').length;
        document.getElementById('characterCountNoSpaces').textContent = characterCountNoSpaces.toLocaleString();
        
        // Word count
        const words = text.trim().split(/\s+/).filter(word => word.length > 0);
        const wordCount = text.trim() === '' ? 0 : words.length;
        document.getElementById('wordCount').textContent = wordCount.toLocaleString();
        
        // Paragraph count
        const paragraphs = text.trim().split(/\n\s*\n/).filter(para => para.trim().length > 0);
        const paragraphCount = text.trim() === '' ? 0 : paragraphs.length;
        document.getElementById('paragraphCount').textContent = paragraphCount.toLocaleString();
        
        // Reading time (average 200 words per minute)
        const readingTime = Math.ceil(wordCount / 200);
        document.getElementById('readingTime').textContent = `${readingTime} min`;
        
        // Speaking time (average 150 words per minute)
        const speakingTime = Math.ceil(wordCount / 150);
        document.getElementById('speakingTime').textContent = `${speakingTime} min`;
    }
};

// Dice Roller
window.ToolComponents.DiceRoller = class {
    render() {
        return `
            <div class="space-y-8">
                <div class="text-center">
                    <h3 class="text-2xl font-bold mb-6">Dice Roller</h3>
                    
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <button class="dice-btn px-4 py-8 bg-primary text-white rounded-lg hover:bg-purple-700 transition-colors" data-sides="4">
                            <div class="text-2xl font-bold">D4</div>
                            <div class="text-sm">4-sided</div>
                        </button>
                        <button class="dice-btn px-4 py-8 bg-secondary text-white rounded-lg hover:bg-blue-700 transition-colors" data-sides="6">
                            <div class="text-2xl font-bold">D6</div>
                            <div class="text-sm">6-sided</div>
                        </button>
                        <button class="dice-btn px-4 py-8 bg-accent text-white rounded-lg hover:bg-green-700 transition-colors" data-sides="8">
                            <div class="text-2xl font-bold">D8</div>
                            <div class="text-sm">8-sided</div>
                        </button>
                        <button class="dice-btn px-4 py-8 bg-warning text-white rounded-lg hover:bg-yellow-600 transition-colors" data-sides="10">
                            <div class="text-2xl font-bold">D10</div>
                            <div class="text-sm">10-sided</div>
                        </button>
                        <button class="dice-btn px-4 py-8 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors" data-sides="12">
                            <div class="text-2xl font-bold">D12</div>
                            <div class="text-sm">12-sided</div>
                        </button>
                        <button class="dice-btn px-4 py-8 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors" data-sides="20">
                            <div class="text-2xl font-bold">D20</div>
                            <div class="text-sm">20-sided</div>
                        </button>
                        <button class="dice-btn px-4 py-8 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors" data-sides="100">
                            <div class="text-2xl font-bold">D100</div>
                            <div class="text-sm">100-sided</div>
                        </button>
                        <div class="px-4 py-4">
                            <label class="block text-sm font-medium text-gray-700 mb-2">Custom</label>
                            <input type="number" id="customSides" min="2" max="1000" placeholder="Sides" class="w-full px-2 py-1 border border-gray-300 rounded text-center">
                            <button id="rollCustom" class="w-full mt-2 px-2 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors">Roll</button>
                        </div>
                    </div>

                    <div id="diceResult" class="text-6xl font-bold text-primary mb-4">🎲</div>
                    <div id="diceResultText" class="text-xl text-gray-600 mb-6">Click a die to roll!</div>
                </div>

                <hr class="border-gray-300">

                <div class="text-center">
                    <h3 class="text-2xl font-bold mb-6">Coin Flip</h3>
                    
                    <button id="flipCoin" class="px-8 py-4 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors font-semibold text-xl">
                        Flip Coin
                    </button>
                    
                    <div id="coinResult" class="text-6xl font-bold text-yellow-500 mt-6 mb-4">🪙</div>
                    <div id="coinResultText" class="text-xl text-gray-600">Click to flip!</div>
                </div>

                <div>
                    <h3 class="text-lg font-semibold mb-4">Roll History</h3>
                    <div id="rollHistory" class="max-h-48 overflow-y-auto bg-gray-50 p-4 rounded-lg">
                        <div class="text-gray-500 text-center">No rolls yet</div>
                    </div>
                    <button id="clearHistory" class="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors">
                        Clear History
                    </button>
                </div>
            </div>
        `;
    }

    init() {
        this.history = [];
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.querySelectorAll('.dice-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const sides = parseInt(e.currentTarget.dataset.sides);
                this.rollDice(sides);
            });
        });

        document.getElementById('rollCustom').addEventListener('click', () => {
            const sides = parseInt(document.getElementById('customSides').value);
            if (sides >= 2) {
                this.rollDice(sides);
            }
        });

        document.getElementById('flipCoin').addEventListener('click', () => {
            this.flipCoin();
        });

        document.getElementById('clearHistory').addEventListener('click', () => {
            this.clearHistory();
        });
    }

    rollDice(sides) {
        const result = Math.floor(Math.random() * sides) + 1;
        
        document.getElementById('diceResult').textContent = result;
        document.getElementById('diceResultText').textContent = `Rolled a D${sides}`;
        
        this.addToHistory(`D${sides}: ${result}`);
    }

    flipCoin() {
        const result = Math.random() < 0.5 ? 'Heads' : 'Tails';
        const emoji = result === 'Heads' ? '👑' : '🪙';
        
        document.getElementById('coinResult').textContent = emoji;
        document.getElementById('coinResultText').textContent = result;
        
        this.addToHistory(`Coin: ${result}`);
    }

    addToHistory(entry) {
        const timestamp = new Date().toLocaleTimeString();
        this.history.unshift(`${timestamp} - ${entry}`);
        
        if (this.history.length > 50) {
            this.history = this.history.slice(0, 50);
        }
        
        this.updateHistoryDisplay();
    }

    updateHistoryDisplay() {
        const historyDiv = document.getElementById('rollHistory');
        
        if (this.history.length === 0) {
            historyDiv.innerHTML = '<div class="text-gray-500 text-center">No rolls yet</div>';
            return;
        }
        
        historyDiv.innerHTML = this.history.map(entry => 
            `<div class="py-1 border-b border-gray-200 last:border-b-0">${entry}</div>`
        ).join('');
    }

    clearHistory() {
        this.history = [];
        this.updateHistoryDisplay();
    }
};

// Age Calculator
window.ToolComponents.AgeCalculator = class {
    render() {
        return `
            <div class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Birth Date</label>
                        <input type="date" id="birthDate" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Calculate Age On</label>
                        <input type="date" id="targetDate" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
                    </div>
                </div>

                <div class="flex justify-center">
                    <button id="calculateAge" class="px-6 py-3 bg-primary text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold">
                        Calculate Age
                    </button>
                </div>

                <div id="ageResult" class="hidden">
                    <div class="bg-gray-50 p-6 rounded-lg">
                        <h3 class="text-xl font-semibold mb-4 text-center">Age Calculation Result</h3>
                        
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <div class="text-center">
                                <div class="text-3xl font-bold text-primary" id="ageYears">0</div>
                                <div class="text-sm text-gray-600">Years</div>
                            </div>
                            <div class="text-center">
                                <div class="text-3xl font-bold text-secondary" id="ageMonths">0</div>
                                <div class="text-sm text-gray-600">Months</div>
                            </div>
                            <div class="text-center">
                                <div class="text-3xl font-bold text-accent" id="ageDays">0</div>
                                <div class="text-sm text-gray-600">Days</div>
                            </div>
                        </div>

                        <div class="space-y-2 text-center">
                            <div class="text-lg" id="totalDays"></div>
                            <div class="text-lg" id="totalWeeks"></div>
                            <div class="text-lg" id="totalHours"></div>
                            <div class="text-lg" id="totalMinutes"></div>
                        </div>

                        <div class="mt-6 p-4 bg-blue-50 rounded-lg">
                            <h4 class="font-semibold mb-2">Next Birthday</h4>
                            <div id="nextBirthday" class="text-gray-700"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    init() {
        // Set today's date as default target date
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('targetDate').value = today;
        
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.getElementById('calculateAge').addEventListener('click', () => {
            this.calculateAge();
        });

        document.getElementById('birthDate').addEventListener('change', () => {
            if (document.getElementById('birthDate').value) {
                this.calculateAge();
            }
        });

        document.getElementById('targetDate').addEventListener('change', () => {
            if (document.getElementById('birthDate').value) {
                this.calculateAge();
            }
        });
    }

    calculateAge() {
        const birthDate = new Date(document.getElementById('birthDate').value);
        const targetDate = new Date(document.getElementById('targetDate').value);
        
        if (!birthDate || !targetDate) {
            return;
        }

        if (birthDate > targetDate) {
            alert('Birth date cannot be after the target date!');
            return;
        }

        const age = this.getAge(birthDate, targetDate);
        this.displayResults(age, birthDate, targetDate);
    }

    getAge(birthDate, targetDate) {
        let years = targetDate.getFullYear() - birthDate.getFullYear();
        let months = targetDate.getMonth() - birthDate.getMonth();
        let days = targetDate.getDate() - birthDate.getDate();

        if (days < 0) {
            months--;
            const lastMonth = new Date(targetDate.getFullYear(), targetDate.getMonth(), 0);
            days += lastMonth.getDate();
        }

        if (months < 0) {
            years--;
            months += 12;
        }

        const totalDays = Math.floor((targetDate - birthDate) / (1000 * 60 * 60 * 24));
        const totalWeeks = Math.floor(totalDays / 7);
        const totalHours = totalDays * 24;
        const totalMinutes = totalHours * 60;

        return {
            years,
            months,
            days,
            totalDays,
            totalWeeks,
            totalHours,
            totalMinutes
        };
    }

    displayResults(age, birthDate, targetDate) {
        document.getElementById('ageYears').textContent = age.years;
        document.getElementById('ageMonths').textContent = age.months;
        document.getElementById('ageDays').textContent = age.days;
        
        document.getElementById('totalDays').textContent = `Total: ${age.totalDays.toLocaleString()} days`;
        document.getElementById('totalWeeks').textContent = `Total: ${age.totalWeeks.toLocaleString()} weeks`;
        document.getElementById('totalHours').textContent = `Total: ${age.totalHours.toLocaleString()} hours`;
        document.getElementById('totalMinutes').textContent = `Total: ${age.totalMinutes.toLocaleString()} minutes`;

        // Calculate next birthday
        const nextBirthday = this.getNextBirthday(birthDate, targetDate);
        document.getElementById('nextBirthday').textContent = nextBirthday;

        document.getElementById('ageResult').classList.remove('hidden');
    }

    getNextBirthday(birthDate, targetDate) {
        const currentYear = targetDate.getFullYear();
        let nextBirthday = new Date(currentYear, birthDate.getMonth(), birthDate.getDate());
        
        if (nextBirthday <= targetDate) {
            nextBirthday = new Date(currentYear + 1, birthDate.getMonth(), birthDate.getDate());
        }
        
        const daysUntil = Math.ceil((nextBirthday - targetDate) / (1000 * 60 * 60 * 24));
        
        return `${nextBirthday.toLocaleDateString()} (${daysUntil} days from target date)`;
    }
};

// Tip Calculator
window.ToolComponents.TipCalculator = class {
    render() {
        return `
            <div class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Bill Amount ($)</label>
                        <input type="number" id="billAmount" step="0.01" min="0" placeholder="0.00" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Number of People</label>
                        <input type="number" id="numPeople" min="1" value="1" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
                    </div>
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                        Tip Percentage: <span id="tipPercentageDisplay">15%</span>
                    </label>
                    <input type="range" id="tipPercentage" min="0" max="30" value="15" class="w-full">
                    <div class="flex justify-between text-sm text-gray-500 mt-1">
                        <span>0%</span>
                        <span>15%</span>
                        <span>30%</span>
                    </div>
                </div>

                <div class="grid grid-cols-3 gap-4">
                    <button class="tip-preset px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors" data-tip="10">10%</button>
                    <button class="tip-preset px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors" data-tip="15">15%</button>
                    <button class="tip-preset px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors" data-tip="18">18%</button>
                    <button class="tip-preset px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors" data-tip="20">20%</button>
                    <button class="tip-preset px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors" data-tip="22">22%</button>
                    <button class="tip-preset px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors" data-tip="25">25%</button>
                </div>

                <div class="bg-gray-50 p-6 rounded-lg">
                    <h3 class="text-xl font-semibold mb-4 text-center">Calculation Results</h3>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="space-y-4">
                            <div class="flex justify-between items-center">
                                <span class="text-gray-700">Tip Amount:</span>
                                <span class="text-xl font-bold text-primary" id="tipAmount">$0.00</span>
                            </div>
                            <div class="flex justify-between items-center">
                                <span class="text-gray-700">Total Amount:</span>
                                <span class="text-xl font-bold text-secondary" id="totalAmount">$0.00</span>
                            </div>
                        </div>
                        
                        <div class="space-y-4">
                            <div class="flex justify-between items-center">
                                <span class="text-gray-700">Tip Per Person:</span>
                                <span class="text-xl font-bold text-accent" id="tipPerPerson">$0.00</span>
                            </div>
                            <div class="flex justify-between items-center">
                                <span class="text-gray-700">Total Per Person:</span>
                                <span class="text-xl font-bold text-warning" id="totalPerPerson">$0.00</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    init() {
        this.setupEventListeners();
        this.calculateTip();
    }

    setupEventListeners() {
        document.getElementById('billAmount').addEventListener('input', () => {
            this.calculateTip();
        });

        document.getElementById('numPeople').addEventListener('input', () => {
            this.calculateTip();
        });

        document.getElementById('tipPercentage').addEventListener('input', (e) => {
            document.getElementById('tipPercentageDisplay').textContent = `${e.target.value}%`;
            this.calculateTip();
        });

        document.querySelectorAll('.tip-preset').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tipValue = e.target.dataset.tip;
                document.getElementById('tipPercentage').value = tipValue;
                document.getElementById('tipPercentageDisplay').textContent = `${tipValue}%`;
                this.calculateTip();
            });
        });
    }

    calculateTip() {
        const billAmount = parseFloat(document.getElementById('billAmount').value) || 0;
        const tipPercentage = parseFloat(document.getElementById('tipPercentage').value) || 0;
        const numPeople = parseInt(document.getElementById('numPeople').value) || 1;

        const tipAmount = billAmount * (tipPercentage / 100);
        const totalAmount = billAmount + tipAmount;
        const tipPerPerson = tipAmount / numPeople;
        const totalPerPerson = totalAmount / numPeople;

        document.getElementById('tipAmount').textContent = `$${tipAmount.toFixed(2)}`;
        document.getElementById('totalAmount').textContent = `$${totalAmount.toFixed(2)}`;
        document.getElementById('tipPerPerson').textContent = `$${tipPerPerson.toFixed(2)}`;
        document.getElementById('totalPerPerson').textContent = `$${totalPerPerson.toFixed(2)}`;
    }
};

// Text Reverser
window.ToolComponents.TextReverser = class {
    render() {
        return `
            <div class="space-y-6">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Input Text</label>
                    <textarea id="inputText" placeholder="Enter your text here..." class="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"></textarea>
                </div>

                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <button id="reverseText" class="px-4 py-2 bg-primary text-white rounded-md hover:bg-purple-700 transition-colors">
                        Reverse Text
                    </button>
                    <button id="reverseWords" class="px-4 py-2 bg-secondary text-white rounded-md hover:bg-blue-700 transition-colors">
                        Reverse Words
                    </button>
                    <button id="flipText" class="px-4 py-2 bg-accent text-white rounded-md hover:bg-green-700 transition-colors">
                        Flip Text
                    </button>
                    <button id="mirrorText" class="px-4 py-2 bg-warning text-white rounded-md hover:bg-yellow-600 transition-colors">
                        Mirror Text
                    </button>
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Output</label>
                    <textarea id="outputText" class="w-full h-32 px-3 py-2 border border-gray-300 rounded-md bg-gray-50" readonly></textarea>
                </div>

                <div class="flex justify-center">
                    <button id="copyOutput" class="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors">
                        Copy Output
                    </button>
                </div>
            </div>
        `;
    }

    init() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.getElementById('reverseText').addEventListener('click', () => {
            this.reverseText();
        });

        document.getElementById('reverseWords').addEventListener('click', () => {
            this.reverseWords();
        });

        document.getElementById('flipText').addEventListener('click', () => {
            this.flipText();
        });

        document.getElementById('mirrorText').addEventListener('click', () => {
            this.mirrorText();
        });

        document.getElementById('copyOutput').addEventListener('click', () => {
            this.copyOutput();
        });
    }

    reverseText() {
        const input = document.getElementById('inputText').value;
        const output = input.split('').reverse().join('');
        document.getElementById('outputText').value = output;
    }

    reverseWords() {
        const input = document.getElementById('inputText').value;
        const output = input.split(' ').reverse().join(' ');
        document.getElementById('outputText').value = output;
    }

    flipText() {
        const input = document.getElementById('inputText').value;
        const flipMap = {
            'a': 'ɐ', 'b': 'q', 'c': 'ɔ', 'd': 'p', 'e': 'ǝ', 'f': 'ɟ', 'g': 'ƃ', 'h': 'ɥ',
            'i': 'ᴉ', 'j': 'ɾ', 'k': 'ʞ', 'l': 'l', 'm': 'ɯ', 'n': 'u', 'o': 'o', 'p': 'd',
            'q': 'b', 'r': 'ɹ', 's': 's', 't': 'ʇ', 'u': 'n', 'v': 'ʌ', 'w': 'ʍ', 'x': 'x',
            'y': 'ʎ', 'z': 'z', '?': '¿', '!': '¡', '.': '˙', ',': "'", "'": ',', '"': '„',
            '(': ')', ')': '(', '[': ']', ']': '[', '{': '}', '}': '{', '<': '>', '>': '<'
        };
        
        const output = input.toLowerCase().split('').map(char => flipMap[char] || char).reverse().join('');
        document.getElementById('outputText').value = output;
    }

    mirrorText() {
        const input = document.getElementById('inputText').value;
        const output = input + ' | ' + input.split('').reverse().join('');
        document.getElementById('outputText').value = output;
    }

    copyOutput() {
        const outputText = document.getElementById('outputText');
        outputText.select();
        document.execCommand('copy');
        
        const button = document.getElementById('copyOutput');
        const originalText = button.textContent;
        button.textContent = 'Copied!';
        
        setTimeout(() => {
            button.textContent = originalText;
        }, 2000);
    }
};

// Number Converter
window.ToolComponents.NumberConverter = class {
    constructor() {
        this.ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
        this.teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
        this.tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
        this.scales = ['', 'thousand', 'million', 'billion', 'trillion'];
    }

    render() {
        return `
            <div class="space-y-6">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Enter Number</label>
                    <input type="number" id="numberInput" placeholder="Enter a number (0 - 999,999,999,999)" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
                </div>

                <div class="flex justify-center">
                    <button id="convertNumber" class="px-6 py-3 bg-primary text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold">
                        Convert to Words
                    </button>
                </div>

                <div id="conversionResult" class="hidden">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Number in Words</label>
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <div id="wordsOutput" class="text-lg font-medium text-gray-900 capitalize"></div>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="bg-blue-50 p-4 rounded-lg">
                        <h3 class="font-semibold mb-2">Quick Examples</h3>
                        <div class="space-y-1 text-sm">
                            <button class="example-btn block text-left text-blue-600 hover:text-blue-800" data-number="42">42 → forty-two</button>
                            <button class="example-btn block text-left text-blue-600 hover:text-blue-800" data-number="123">123 → one hundred twenty-three</button>
                            <button class="example-btn block text-left text-blue-600 hover:text-blue-800" data-number="1000">1,000 → one thousand</button>
                            <button class="example-btn block text-left text-blue-600 hover:text-blue-800" data-number="1234567">1,234,567 → one million two hundred thirty-four thousand five hundred sixty-seven</button>
                        </div>
                    </div>
                    
                    <div class="bg-green-50 p-4 rounded-lg">
                        <h3 class="font-semibold mb-2">Features</h3>
                        <ul class="text-sm space-y-1">
                            <li>✓ Supports numbers up to 999 trillion</li>
                            <li>✓ Proper English formatting</li>
                            <li>✓ Handles negative numbers</li>
                            <li>✓ Real-time conversion</li>
                        </ul>
                    </div>
                </div>

                <div class="flex justify-center">
                    <button id="copyWords" class="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors hidden">
                        Copy Words
                    </button>
                </div>
            </div>
        `;
    }

    init() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.getElementById('convertNumber').addEventListener('click', () => {
            this.convertNumber();
        });

        document.getElementById('numberInput').addEventListener('input', () => {
            this.convertNumber();
        });

        document.getElementById('copyWords').addEventListener('click', () => {
            this.copyWords();
        });

        document.querySelectorAll('.example-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const number = e.target.dataset.number;
                document.getElementById('numberInput').value = number;
                this.convertNumber();
            });
        });
    }

    convertNumber() {
        const input = document.getElementById('numberInput').value.trim();
        
        if (!input) {
            document.getElementById('conversionResult').classList.add('hidden');
            document.getElementById('copyWords').classList.add('hidden');
            return;
        }

        const number = parseInt(input);
        
        if (isNaN(number)) {
            document.getElementById('wordsOutput').textContent = 'Please enter a valid number';
            document.getElementById('conversionResult').classList.remove('hidden');
            document.getElementById('copyWords').classList.add('hidden');
            return;
        }

        if (number > 999999999999 || number < -999999999999) {
            document.getElementById('wordsOutput').textContent = 'Number too large. Please enter a number between -999,999,999,999 and 999,999,999,999';
            document.getElementById('conversionResult').classList.remove('hidden');
            document.getElementById('copyWords').classList.add('hidden');
            return;
        }

        const words = this.numberToWords(number);
        document.getElementById('wordsOutput').textContent = words;
        document.getElementById('conversionResult').classList.remove('hidden');
        document.getElementById('copyWords').classList.remove('hidden');
    }

    numberToWords(number) {
        if (number === 0) return 'zero';
        
        if (number < 0) {
            return 'negative ' + this.numberToWords(-number);
        }

        let words = '';
        let scaleIndex = 0;

        while (number > 0) {
            const chunk = number % 1000;
            if (chunk !== 0) {
                const chunkWords = this.convertChunk(chunk);
                const scale = this.scales[scaleIndex];
                words = chunkWords + (scale ? ' ' + scale : '') + (words ? ' ' + words : '');
            }
            number = Math.floor(number / 1000);
            scaleIndex++;
        }

        return words;
    }

    convertChunk(number) {
        let words = '';

        // Hundreds
        const hundreds = Math.floor(number / 100);
        if (hundreds > 0) {
            words += this.ones[hundreds] + ' hundred';
        }

        // Tens and ones
        const remainder = number % 100;
        if (remainder > 0) {
            if (words) words += ' ';
            
            if (remainder < 10) {
                words += this.ones[remainder];
            } else if (remainder < 20) {
                words += this.teens[remainder - 10];
            } else {
                const tensDigit = Math.floor(remainder / 10);
                const onesDigit = remainder % 10;
                words += this.tens[tensDigit];
                if (onesDigit > 0) {
                    words += '-' + this.ones[onesDigit];
                }
            }
        }

        return words;
    }

    copyWords() {
        const wordsOutput = document.getElementById('wordsOutput').textContent;
        navigator.clipboard.writeText(wordsOutput).then(() => {
            const button = document.getElementById('copyWords');
            const originalText = button.textContent;
            button.textContent = 'Copied!';
            
            setTimeout(() => {
                button.textContent = originalText;
            }, 2000);
        });
    }
};

// Typing Test
window.ToolComponents.TypingTest = class {
    constructor() {
        this.sampleTexts = [
            "The quick brown fox jumps over the lazy dog. This pangram contains every letter of the alphabet at least once.",
            "In a hole in the ground there lived a hobbit. Not a nasty, dirty, wet hole filled with the ends of worms and an oozy smell.",
            "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness.",
            "To be or not to be, that is the question. Whether 'tis nobler in the mind to suffer the slings and arrows of outrageous fortune.",
            "All happy families are alike; each unhappy family is unhappy in its own way. Everything was in confusion in the Oblonskys' house."
        ];
        
        this.currentText = '';
        this.startTime = null;
        this.isTestActive = false;
        this.currentPosition = 0;
        this.errors = 0;
    }

    render() {
        return `
            <div class="space-y-6">
                <div class="text-center">
                    <h3 class="text-2xl font-bold mb-4">Typing Speed Test</h3>
                    <p class="text-gray-600 mb-6">Test your typing speed and accuracy</p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div class="bg-primary text-white p-4 rounded-lg text-center">
                        <div class="text-2xl font-bold" id="wpmDisplay">0</div>
                        <div class="text-sm">WPM</div>
                    </div>
                    <div class="bg-secondary text-white p-4 rounded-lg text-center">
                        <div class="text-2xl font-bold" id="accuracyDisplay">100%</div>
                        <div class="text-sm">Accuracy</div>
                    </div>
                    <div class="bg-accent text-white p-4 rounded-lg text-center">
                        <div class="text-2xl font-bold" id="timeDisplay">0</div>
                        <div class="text-sm">Seconds</div>
                    </div>
                </div>

                <div class="bg-gray-50 p-6 rounded-lg">
                    <div id="textDisplay" class="text-lg leading-relaxed font-mono mb-4 min-h-[120px] p-4 bg-white rounded border">
                        Click "Start Test" to begin
                    </div>
                    
                    <textarea id="typingInput" placeholder="Start typing here..." class="w-full h-32 px-3 py-2 border border-gray-300 rounded-md font-mono focus:outline-none focus:ring-2 focus:ring-primary" disabled></textarea>
                </div>

                <div class="flex justify-center space-x-4">
                    <button id="startTest" class="px-6 py-3 bg-primary text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold">
                        Start Test
                    </button>
                    <button id="resetTest" class="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-semibold">
                        Reset
                    </button>
                </div>

                <div id="results" class="hidden bg-blue-50 p-6 rounded-lg">
                    <h3 class="text-xl font-semibold mb-4 text-center">Test Results</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <div class="text-sm text-gray-600">Words Per Minute</div>
                            <div class="text-2xl font-bold text-primary" id="finalWPM">0</div>
                        </div>
                        <div>
                            <div class="text-sm text-gray-600">Accuracy</div>
                            <div class="text-2xl font-bold text-secondary" id="finalAccuracy">100%</div>
                        </div>
                        <div>
                            <div class="text-sm text-gray-600">Total Time</div>
                            <div class="text-2xl font-bold text-accent" id="finalTime">0s</div>
                        </div>
                        <div>
                            <div class="text-sm text-gray-600">Characters Typed</div>
                            <div class="text-2xl font-bold text-warning" id="finalChars">0</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    init() {
        this.setupEventListeners();
        this.loadNewText();
    }

    setupEventListeners() {
        document.getElementById('startTest').addEventListener('click', () => {
            this.startTest();
        });

        document.getElementById('resetTest').addEventListener('click', () => {
            this.resetTest();
        });

        document.getElementById('typingInput').addEventListener('input', (e) => {
            if (this.isTestActive) {
                this.handleTyping(e);
            }
        });
    }

    loadNewText() {
        this.currentText = this.sampleTexts[Math.floor(Math.random() * this.sampleTexts.length)];
        this.displayText();
    }

    displayText() {
        const textDisplay = document.getElementById('textDisplay');
        const typedText = document.getElementById('typingInput').value;
        
        let html = '';
        for (let i = 0; i < this.currentText.length; i++) {
            const char = this.currentText[i];
            
            if (i < typedText.length) {
                if (typedText[i] === char) {
                    html += `<span class="bg-green-200 text-green-800">${char}</span>`;
                } else {
                    html += `<span class="bg-red-200 text-red-800">${char}</span>`;
                }
            } else if (i === typedText.length) {
                html += `<span class="bg-blue-200 text-blue-800">${char}</span>`;
            } else {
                html += char;
            }
        }
        
        textDisplay.innerHTML = html;
    }

    startTest() {
        this.isTestActive = true;
        this.startTime = Date.now();
        this.currentPosition = 0;
        this.errors = 0;
        
        document.getElementById('typingInput').disabled = false;
        document.getElementById('typingInput').value = '';
        document.getElementById('typingInput').focus();
        document.getElementById('startTest').textContent = 'Test in Progress...';
        document.getElementById('startTest').disabled = true;
        document.getElementById('results').classList.add('hidden');
        
        this.loadNewText();
        this.startTimer();
    }

    startTimer() {
        this.timerInterval = setInterval(() => {
            if (this.isTestActive) {
                const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
                document.getElementById('timeDisplay').textContent = elapsed;
                this.updateStats();
            }
        }, 100);
    }

    handleTyping(e) {
        const typedText = e.target.value;
        this.currentPosition = typedText.length;
        
        // Count errors
        this.errors = 0;
        for (let i = 0; i < typedText.length; i++) {
            if (i < this.currentText.length && typedText[i] !== this.currentText[i]) {
                this.errors++;
            }
        }
        
        this.displayText();
        this.updateStats();
        
        // Check if test is complete
        if (typedText === this.currentText) {
            this.endTest();
        }
    }

    updateStats() {
        if (!this.startTime) return;
        
        const elapsed = (Date.now() - this.startTime) / 1000 / 60; // minutes
        const typedChars = document.getElementById('typingInput').value.length;
        const words = typedChars / 5; // Standard: 5 characters = 1 word
        const wpm = elapsed > 0 ? Math.round(words / elapsed) : 0;
        const accuracy = typedChars > 0 ? Math.round(((typedChars - this.errors) / typedChars) * 100) : 100;
        
        document.getElementById('wpmDisplay').textContent = wpm;
        document.getElementById('accuracyDisplay').textContent = `${accuracy}%`;
    }

    endTest() {
        this.isTestActive = false;
        clearInterval(this.timerInterval);
        
        const elapsed = (Date.now() - this.startTime) / 1000;
        const typedChars = this.currentText.length;
        const words = typedChars / 5;
        const wpm = Math.round(words / (elapsed / 60));
        const accuracy = Math.round(((typedChars - this.errors) / typedChars) * 100);
        
        document.getElementById('finalWPM').textContent = wpm;
        document.getElementById('finalAccuracy').textContent = `${accuracy}%`;
        document.getElementById('finalTime').textContent = `${elapsed.toFixed(1)}s`;
        document.getElementById('finalChars').textContent = typedChars;
        
        document.getElementById('results').classList.remove('hidden');
        document.getElementById('startTest').textContent = 'Start New Test';
        document.getElementById('startTest').disabled = false;
        document.getElementById('typingInput').disabled = true;
    }

    resetTest() {
        this.isTestActive = false;
        clearInterval(this.timerInterval);
        
        document.getElementById('typingInput').value = '';
        document.getElementById('typingInput').disabled = true;
        document.getElementById('startTest').textContent = 'Start Test';
        document.getElementById('startTest').disabled = false;
        document.getElementById('results').classList.add('hidden');
        
        document.getElementById('wpmDisplay').textContent = '0';
        document.getElementById('accuracyDisplay').textContent = '100%';
        document.getElementById('timeDisplay').textContent = '0';
        
        this.loadNewText();
    }
};

// Luck Wheel
window.ToolComponents.LuckWheel = class {
    constructor() {
        this.options = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5', 'Option 6'];
        this.isSpinning = false;
        this.rotation = 0;
    }

    render() {
        return `
            <div class="space-y-6">
                <div class="text-center">
                    <h3 class="text-2xl font-bold mb-4">Luck Wheel</h3>
                    <p class="text-gray-600 mb-6">Add your options and spin the wheel!</p>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                        <h4 class="text-lg font-semibold mb-4">Wheel Options</h4>
                        <div id="optionsList" class="space-y-2 mb-4">
                            <!-- Options will be dynamically added here -->
                        </div>
                        
                        <div class="flex space-x-2">
                            <input type="text" id="newOption" placeholder="Enter new option..." class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
                            <button id="addOption" class="px-4 py-2 bg-primary text-white rounded-md hover:bg-purple-700 transition-colors">
                                Add
                            </button>
                        </div>
                        
                        <div class="mt-4 flex space-x-2">
                            <button id="clearOptions" class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors">
                                Clear All
                            </button>
                            <button id="addPresets" class="px-4 py-2 bg-secondary text-white rounded-md hover:bg-blue-700 transition-colors">
                                Add Presets
                            </button>
                        </div>
                    </div>

                    <div class="text-center">
                        <div class="relative inline-block">
                            <canvas id="wheelCanvas" width="300" height="300" class="border-4 border-gray-300 rounded-full"></canvas>
                            <div class="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
                                <div class="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-red-500"></div>
                            </div>
                        </div>
                        
                        <div class="mt-6">
                            <button id="spinWheel" class="px-8 py-4 bg-accent text-white rounded-lg hover:bg-green-700 transition-colors font-semibold text-xl" disabled>
                                Spin the Wheel!
                            </button>
                        </div>
                        
                        <div id="result" class="mt-6 hidden">
                            <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                <h3 class="text-lg font-semibold text-yellow-800 mb-2">🎉 Winner!</h3>
                                <div id="winnerText" class="text-xl font-bold text-yellow-900"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="history" class="mt-8">
                    <h4 class="text-lg font-semibold mb-4">Spin History</h4>
                    <div id="historyList" class="bg-gray-50 p-4 rounded-lg min-h-[100px]">
                        <div class="text-gray-500 text-center">No spins yet</div>
                    </div>
                    <button id="clearHistory" class="mt-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors">
                        Clear History
                    </button>
                </div>
            </div>
        `;
    }

    init() {
        this.canvas = document.getElementById('wheelCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.history = [];
        
        this.setupEventListeners();
        this.renderOptions();
        this.drawWheel();
    }

    setupEventListeners() {
        document.getElementById('addOption').addEventListener('click', () => {
            this.addOption();
        });

        document.getElementById('newOption').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addOption();
            }
        });

        document.getElementById('clearOptions').addEventListener('click', () => {
            this.clearOptions();
        });

        document.getElementById('addPresets').addEventListener('click', () => {
            this.addPresets();
        });

        document.getElementById('spinWheel').addEventListener('click', () => {
            this.spinWheel();
        });

        document.getElementById('clearHistory').addEventListener('click', () => {
            this.clearHistory();
        });
    }

    addOption() {
        const input = document.getElementById('newOption');
        const option = input.value.trim();
        
        if (option && !this.options.includes(option)) {
            this.options.push(option);
            input.value = '';
            this.renderOptions();
            this.drawWheel();
        }
    }

    removeOption(index) {
        this.options.splice(index, 1);
        this.renderOptions();
        this.drawWheel();
    }

    clearOptions() {
        this.options = [];
        this.renderOptions();
        this.drawWheel();
    }

    addPresets() {
        const presets = ['Yes', 'No', 'Maybe', 'Definitely', 'Never', 'Ask Again'];
        this.options = [...presets];
        this.renderOptions();
        this.drawWheel();
    }

    renderOptions() {
        const container = document.getElementById('optionsList');
        const spinButton = document.getElementById('spinWheel');
        
        if (this.options.length === 0) {
            container.innerHTML = '<div class="text-gray-500 text-center py-4">No options added yet</div>';
            spinButton.disabled = true;
            return;
        }

        spinButton.disabled = this.options.length < 2;
        
        container.innerHTML = this.options.map((option, index) => `
            <div class="flex items-center justify-between bg-white p-3 rounded border">
                <span class="flex-1">${option}</span>
                <button onclick="window.currentLuckWheel.removeOption(${index})" class="text-red-500 hover:text-red-700 ml-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
        `).join('');
        
        // Store reference for remove function
        window.currentLuckWheel = this;
    }

    drawWheel() {
        const canvas = this.canvas;
        const ctx = this.ctx;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = 140;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        if (this.options.length === 0) {
            ctx.fillStyle = '#f3f4f6';
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
            ctx.fill();
            
            ctx.fillStyle = '#6b7280';
            ctx.font = '16px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('Add options to spin', centerX, centerY);
            return;
        }
        
        const anglePerSection = (2 * Math.PI) / this.options.length;
        const colors = ['#8B5CF6', '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5A2B', '#EC4899', '#6366F1'];
        
        this.options.forEach((option, index) => {
            const startAngle = index * anglePerSection + this.rotation;
            const endAngle = startAngle + anglePerSection;
            
            // Draw section
            ctx.fillStyle = colors[index % colors.length];
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, startAngle, endAngle);
            ctx.closePath();
            ctx.fill();
            
            // Draw border
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 2;
            ctx.stroke();
            
            // Draw text
            ctx.save();
            ctx.translate(centerX, centerY);
            ctx.rotate(startAngle + anglePerSection / 2);
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 14px Arial';
            ctx.textAlign = 'center';
            
            const text = option.length > 12 ? option.substring(0, 12) + '...' : option;
            ctx.fillText(text, radius * 0.7, 5);
            ctx.restore();
        });
    }

    spinWheel() {
        if (this.isSpinning || this.options.length < 2) return;
        
        this.isSpinning = true;
        document.getElementById('spinWheel').disabled = true;
        document.getElementById('result').classList.add('hidden');
        
        const spins = 3 + Math.random() * 3; // 3-6 full rotations
        const finalRotation = spins * 2 * Math.PI + Math.random() * 2 * Math.PI;
        const duration = 3000; // 3 seconds
        const startTime = Date.now();
        const startRotation = this.rotation;
        
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth deceleration
            const easeOut = 1 - Math.pow(1 - progress, 3);
            
            this.rotation = startRotation + finalRotation * easeOut;
            this.drawWheel();
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                this.finishSpin();
            }
        };
        
        animate();
    }

    finishSpin() {
        this.isSpinning = false;
        document.getElementById('spinWheel').disabled = false;
        
        // Calculate winner
        const normalizedRotation = (this.rotation % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
        const anglePerSection = (2 * Math.PI) / this.options.length;
        const correctedRotation = (normalizedRotation + Math.PI / 2) % (2 * Math.PI);
        const winnerIndex = Math.floor((2 * Math.PI - correctedRotation) / anglePerSection) % this.options.length;
        const winner = this.options[winnerIndex];
        
        // Show result
        document.getElementById('winnerText').textContent = winner;
        document.getElementById('result').classList.remove('hidden');
        
        // Add to history
        this.addToHistory(winner);
    }

    addToHistory(winner) {
        const timestamp = new Date().toLocaleTimeString();
        this.history.unshift(`${timestamp} - ${winner}`);
        
        if (this.history.length > 20) {
            this.history = this.history.slice(0, 20);
        }
        
        this.updateHistoryDisplay();
    }

    updateHistoryDisplay() {
        const historyDiv = document.getElementById('historyList');
        
        if (this.history.length === 0) {
            historyDiv.innerHTML = '<div class="text-gray-500 text-center">No spins yet</div>';
            return;
        }
        
        historyDiv.innerHTML = this.history.map(entry => 
            `<div class="py-1 border-b border-gray-200 last:border-b-0">${entry}</div>`
        ).join('');
    }

    clearHistory() {
        this.history = [];
        this.updateHistoryDisplay();
    }
};

// Timezone Converter
window.ToolComponents.TimezoneConverter = class {
    constructor() {
        this.timezones = [
            { name: 'UTC', offset: 0, label: 'UTC (Coordinated Universal Time)' },
            { name: 'EST', offset: -5, label: 'EST (Eastern Standard Time)' },
            { name: 'CST', offset: -6, label: 'CST (Central Standard Time)' },
            { name: 'MST', offset: -7, label: 'MST (Mountain Standard Time)' },
            { name: 'PST', offset: -8, label: 'PST (Pacific Standard Time)' },
            { name: 'GMT', offset: 0, label: 'GMT (Greenwich Mean Time)' },
            { name: 'CET', offset: 1, label: 'CET (Central European Time)' },
            { name: 'JST', offset: 9, label: 'JST (Japan Standard Time)' },
            { name: 'AEST', offset: 10, label: 'AEST (Australian Eastern Standard Time)' },
            { name: 'IST', offset: 5.5, label: 'IST (India Standard Time)' },
            { name: 'CST_CHINA', offset: 8, label: 'CST (China Standard Time)' }
        ];
    }

    render() {
        return `
            <div class="space-y-6">
                <div class="text-center">
                    <h3 class="text-2xl font-bold mb-4">Timezone Converter</h3>
                    <p class="text-gray-600 mb-6">Convert time between different timezones</p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="bg-gray-50 p-6 rounded-lg">
                        <h4 class="text-lg font-semibold mb-4">From</h4>
                        
                        <div class="space-y-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                                <select id="fromTimezone" class="w-full px-3 py-2 border border-gray-300 rounded-md">
                                    ${this.timezones.map(tz => 
                                        `<option value="${tz.name}">${tz.label}</option>`
                                    ).join('')}
                                </select>
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Date</label>
                                <input type="date" id="fromDate" class="w-full px-3 py-2 border border-gray-300 rounded-md">
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Time</label>
                                <input type="time" id="fromTime" class="w-full px-3 py-2 border border-gray-300 rounded-md">
                            </div>
                        </div>
                    </div>

                    <div class="bg-gray-50 p-6 rounded-lg">
                        <h4 class="text-lg font-semibold mb-4">To</h4>
                        
                        <div class="space-y-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                                <select id="toTimezone" class="w-full px-3 py-2 border border-gray-300 rounded-md">
                                    ${this.timezones.map(tz => 
                                        `<option value="${tz.name}">${tz.label}</option>`
                                    ).join('')}
                                </select>
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Date</label>
                                <input type="date" id="toDate" class="w-full px-3 py-2 border border-gray-300 rounded-md bg-white" readonly>
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Time</label>
                                <input type="time" id="toTime" class="w-full px-3 py-2 border border-gray-300 rounded-md bg-white" readonly>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="flex justify-center">
                    <button id="convertTime" class="px-6 py-3 bg-primary text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold">
                        Convert Time
                    </button>
                </div>

                <div id="conversionResult" class="hidden bg-blue-50 p-6 rounded-lg">
                    <h3 class="text-xl font-semibold mb-4 text-center">Conversion Result</h3>
                    <div id="resultText" class="text-center text-lg"></div>
                </div>

                <div class="bg-yellow-50 p-4 rounded-lg">
                    <h4 class="font-semibold mb-2">Quick Actions</h4>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-2">
                        <button id="useCurrentTime" class="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors">
                            Use Current Time
                        </button>
                        <button id="swapTimezones" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
                            Swap Timezones
                        </button>
                        <button id="resetForm" class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors">
                            Reset Form
                        </button>
                    </div>
                </div>

                <div class="bg-green-50 p-4 rounded-lg">
                    <h4 class="font-semibold mb-2">World Clock</h4>
                    <div id="worldClock" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <!-- World clock will be populated here -->
                    </div>
                </div>
            </div>
        `;
    }

    init() {
        this.setupEventListeners();
        this.setCurrentTime();
        this.updateWorldClock();
        this.startWorldClockUpdate();
        
        // Set default timezones
        document.getElementById('toTimezone').selectedIndex = 1; // EST
    }

    setupEventListeners() {
        document.getElementById('convertTime').addEventListener('click', () => {
            this.convertTime();
        });

        document.getElementById('useCurrentTime').addEventListener('click', () => {
            this.setCurrentTime();
        });

        document.getElementById('swapTimezones').addEventListener('click', () => {
            this.swapTimezones();
        });

        document.getElementById('resetForm').addEventListener('click', () => {
            this.resetForm();
        });

        ['fromTimezone', 'fromDate', 'fromTime', 'toTimezone'].forEach(id => {
            document.getElementById(id).addEventListener('change', () => {
                this.convertTime();
            });
        });
    }

    setCurrentTime() {
        const now = new Date();
        const date = now.toISOString().split('T')[0];
        const time = now.toTimeString().split(' ')[0].substring(0, 5);
        
        document.getElementById('fromDate').value = date;
        document.getElementById('fromTime').value = time;
        
        this.convertTime();
    }

    convertTime() {
        const fromTimezone = document.getElementById('fromTimezone').value;
        const toTimezone = document.getElementById('toTimezone').value;
        const fromDate = document.getElementById('fromDate').value;
        const fromTime = document.getElementById('fromTime').value;
        
        if (!fromDate || !fromTime) return;
        
        const fromTz = this.timezones.find(tz => tz.name === fromTimezone);
        const toTz = this.timezones.find(tz => tz.name === toTimezone);
        
        // Create date object and convert
        const inputDateTime = new Date(`${fromDate}T${fromTime}:00`);
        
        // Convert to UTC first
        const utcTime = new Date(inputDateTime.getTime() - (fromTz.offset * 60 * 60 * 1000));
        
        // Convert to target timezone
        const targetTime = new Date(utcTime.getTime() + (toTz.offset * 60 * 60 * 1000));
        
        // Update output fields
        const targetDate = targetTime.toISOString().split('T')[0];
        const targetTimeStr = targetTime.toTimeString().split(' ')[0].substring(0, 5);
        
        document.getElementById('toDate').value = targetDate;
        document.getElementById('toTime').value = targetTimeStr;
        
        // Show result
        const resultText = `${fromTime} on ${fromDate} in ${fromTz.label} is ${targetTimeStr} on ${targetDate} in ${toTz.label}`;
        document.getElementById('resultText').textContent = resultText;
        document.getElementById('conversionResult').classList.remove('hidden');
    }

    swapTimezones() {
        const fromSelect = document.getElementById('fromTimezone');
        const toSelect = document.getElementById('toTimezone');
        
        const tempValue = fromSelect.value;
        fromSelect.value = toSelect.value;
        toSelect.value = tempValue;
        
        this.convertTime();
    }

    resetForm() {
        document.getElementById('fromTimezone').selectedIndex = 0;
        document.getElementById('toTimezone').selectedIndex = 1;
        this.setCurrentTime();
        document.getElementById('conversionResult').classList.add('hidden');
    }

    updateWorldClock() {
        const worldClockContainer = document.getElementById('worldClock');
        const now = new Date();
        
        const majorTimezones = [
            { name: 'UTC', offset: 0 },
            { name: 'EST', offset: -5 },
            { name: 'PST', offset: -8 },
            { name: 'GMT', offset: 0 },
            { name: 'CET', offset: 1 },
            { name: 'JST', offset: 9 }
        ];
        
        worldClockContainer.innerHTML = majorTimezones.map(tz => {
            const localTime = new Date(now.getTime() + (tz.offset * 60 * 60 * 1000));
            const timeString = localTime.toTimeString().split(' ')[0];
            const dateString = localTime.toDateString();
            
            return `
                <div class="bg-white p-3 rounded border text-center">
                    <div class="font-semibold text-primary">${tz.name}</div>
                    <div class="text-lg font-mono">${timeString}</div>
                    <div class="text-sm text-gray-600">${dateString}</div>
                </div>
            `;
        }).join('');
    }

    startWorldClockUpdate() {
        setInterval(() => {
            this.updateWorldClock();
        }, 1000);
    }
};

// HTML Editor
window.ToolComponents.HTMLEditor = class {
    render() {
        return `
            <div class="space-y-6">
                <div class="text-center">
                    <h3 class="text-2xl font-bold mb-4">HTML Editor</h3>
                    <p class="text-gray-600 mb-6">Write HTML code and see the live preview</p>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                        <div class="flex justify-between items-center mb-2">
                            <label class="block text-sm font-medium text-gray-700">HTML Code</label>
                            <div class="flex space-x-2">
                                <button id="formatHTML" class="px-3 py-1 bg-primary text-white rounded text-sm hover:bg-purple-700 transition-colors">
                                    Format
                                </button>
                                <button id="clearHTML" class="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition-colors">
                                    Clear
                                </button>
                            </div>
                        </div>
                        <textarea id="htmlInput" placeholder="Enter your HTML code here..." class="w-full h-96 px-3 py-2 border border-gray-300 rounded-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary"></textarea>
                        
                        <div class="mt-4 flex space-x-2">
                            <button id="insertTemplate" class="px-4 py-2 bg-secondary text-white rounded hover:bg-blue-700 transition-colors">
                                Insert Template
                            </button>
                            <button id="downloadHTML" class="px-4 py-2 bg-accent text-white rounded hover:bg-green-700 transition-colors">
                                Download HTML
                            </button>
                        </div>
                    </div>

                    <div>
                        <div class="flex justify-between items-center mb-2">
                            <label class="block text-sm font-medium text-gray-700">Live Preview</label>
                            <button id="refreshPreview" class="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600 transition-colors">
                                Refresh
                            </button>
                        </div>
                        <div class="border border-gray-300 rounded-md h-96 overflow-auto bg-white">
                            <iframe id="htmlPreview" class="w-full h-full border-none" sandbox="allow-scripts"></iframe>
                        </div>
                    </div>
                </div>

                <div class="bg-yellow-50 p-4 rounded-lg">
                    <h4 class="font-semibold mb-2">Quick Templates</h4>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-2">
                        <button class="template-btn px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors" data-template="basic">
                            Basic HTML
                        </button>
                        <button class="template-btn px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors" data-template="form">
                            Form Template
                        </button>
                        <button class="template-btn px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors" data-template="table">
                            Table Template
                        </button>
                    </div>
                </div>

                <div class="bg-blue-50 p-4 rounded-lg">
                    <h4 class="font-semibold mb-2">Features</h4>
                    <ul class="text-sm space-y-1">
                        <li>✓ Live preview as you type</li>
                        <li>✓ HTML formatting and validation</li>
                        <li>✓ Download your HTML file</li>
                        <li>✓ Pre-built templates</li>
                        <li>✓ Syntax highlighting</li>
                    </ul>
                </div>
            </div>
        `;
    }

    init() {
        this.templates = {
            basic: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Page</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 40px;
            line-height: 1.6;
        }
        h1 {
            color: #333;
        }
    </style>
</head>
<body>
    <h1>Welcome to My Page</h1>
    <p>This is a basic HTML template. You can edit this code and see the changes in real-time!</p>
    
    <h2>Features</h2>
    <ul>
        <li>Clean structure</li>
        <li>Responsive design</li>
        <li>Easy to customize</li>
    </ul>
</body>
</html>`,
            form: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Form</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 600px;
            margin: 40px auto;
            padding: 20px;
        }
        .form-group {
            margin-bottom: 15px;
        }
        label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
        }
        input, textarea, select {
            width: 100%;
            padding: 8px;
            border: 1px solid #ddd;
            border-radius: 4px;
            box-sizing: border-box;
        }
        button {
            background-color: #007bff;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        button:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<body>
    <h1>Contact Form</h1>
    <form>
        <div class="form-group">
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" required>
        </div>
        
        <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required>
        </div>
        
        <div class="form-group">
            <label for="subject">Subject:</label>
            <select id="subject" name="subject">
                <option value="general">General Inquiry</option>
                <option value="support">Support</option>
                <option value="feedback">Feedback</option>
            </select>
        </div>
        
        <div class="form-group">
            <label for="message">Message:</label>
            <textarea id="message" name="message" rows="5" required></textarea>
        </div>
        
        <button type="submit">Send Message</button>
    </form>
</body>
</html>`,
            table: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Data Table</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 40px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 12px;
            text-align: left;
        }
        th {
            background-color: #f2f2f2;
            font-weight: bold;
        }
        tr:nth-child(even) {
            background-color: #f9f9f9;
        }
        tr:hover {
            background-color: #f5f5f5;
        }
    </style>
</head>
<body>
    <h1>Employee Data</h1>
    <p>This table shows employee information with hover effects and alternating row colors.</p>
    
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Department</th>
                <th>Position</th>
                <th>Salary</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>001</td>
                <td>John Doe</td>
                <td>Engineering</td>
                <td>Software Developer</td>
                <td>$75,000</td>
            </tr>
            <tr>
                <td>002</td>
                <td>Jane Smith</td>
                <td>Marketing</td>
                <td>Marketing Manager</td>
                <td>$65,000</td>
            </tr>
            <tr>
                <td>003</td>
                <td>Bob Johnson</td>
                <td>Sales</td>
                <td>Sales Representative</td>
                <td>$55,000</td>
            </tr>
            <tr>
                <td>004</td>
                <td>Alice Brown</td>
                <td>HR</td>
                <td>HR Specialist</td>
                <td>$50,000</td>
            </tr>
        </tbody>
    </table>
</body>
</html>`
        };
        
        this.setupEventListeners();
        this.loadTemplate('basic');
    }

    setupEventListeners() {
        document.getElementById('htmlInput').addEventListener('input', () => {
            this.updatePreview();
        });

        document.getElementById('formatHTML').addEventListener('click', () => {
            this.formatHTML();
        });

        document.getElementById('clearHTML').addEventListener('click', () => {
            this.clearHTML();
        });

        document.getElementById('refreshPreview').addEventListener('click', () => {
            this.updatePreview();
        });

        document.getElementById('downloadHTML').addEventListener('click', () => {
            this.downloadHTML();
        });

        document.querySelectorAll('.template-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const template = e.target.dataset.template;
                this.loadTemplate(template);
            });
        });
    }

    loadTemplate(templateName) {
        const template = this.templates[templateName];
        if (template) {
            document.getElementById('htmlInput').value = template;
            this.updatePreview();
        }
    }

    updatePreview() {
        const htmlCode = document.getElementById('htmlInput').value;
        const preview = document.getElementById('htmlPreview');
        
        const blob = new Blob([htmlCode], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        
        preview.src = url;
        
        // Clean up the previous URL
        setTimeout(() => {
            URL.revokeObjectURL(url);
        }, 1000);
    }

    formatHTML() {
        const input = document.getElementById('htmlInput');
        let html = input.value;
        
        // Basic HTML formatting
        html = html.replace(/></g, '>\n<');
        html = html.replace(/^\s+|\s+$/gm, '');
        
        const lines = html.split('\n');
        let indentLevel = 0;
        const indentSize = 2;
        
        const formattedLines = lines.map(line => {
            const trimmedLine = line.trim();
            if (!trimmedLine) return '';
            
            // Decrease indent for closing tags
            if (trimmedLine.startsWith('</')) {
                indentLevel = Math.max(0, indentLevel - 1);
            }
            
            const indentedLine = ' '.repeat(indentLevel * indentSize) + trimmedLine;
            
            // Increase indent for opening tags (but not self-closing)
            if (trimmedLine.startsWith('<') && 
                !trimmedLine.startsWith('</') && 
                !trimmedLine.endsWith('/>') &&
                !trimmedLine.includes('<!')) {
                indentLevel++;
            }
            
            return indentedLine;
        });
        
        input.value = formattedLines.join('\n');
        this.updatePreview();
    }

    clearHTML() {
        if (confirm('Are you sure you want to clear all HTML code?')) {
            document.getElementById('htmlInput').value = '';
            this.updatePreview();
        }
    }

    downloadHTML() {
        const htmlCode = document.getElementById('htmlInput').value;
        const blob = new Blob([htmlCode], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = 'index.html';
        a.click();
        
        URL.revokeObjectURL(url);
    }
};

// Color Palette Generator
window.ToolComponents.ColorPalette = class {
    constructor() {
        this.currentPalette = [];
    }

    render() {
        return `
            <div class="space-y-6">
                <div class="text-center">
                    <h3 class="text-2xl font-bold mb-4">Color Palette Generator</h3>
                    <p class="text-gray-600 mb-6">Generate beautiful color palettes for your projects</p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Base Color</label>
                        <div class="flex items-center space-x-2">
                            <input type="color" id="baseColor" value="#8B5CF6" class="w-16 h-10 border border-gray-300 rounded cursor-pointer">
                            <input type="text" id="baseColorHex" value="#8B5CF6" class="flex-1 px-3 py-2 border border-gray-300 rounded-md font-mono">
                        </div>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Palette Type</label>
                        <select id="paletteType" class="w-full px-3 py-2 border border-gray-300 rounded-md">
                            <option value="monochromatic">Monochromatic</option>
                            <option value="analogous">Analogous</option>
                            <option value="complementary">Complementary</option>
                            <option value="triadic">Triadic</option>
                            <option value="tetradic">Tetradic</option>
                            <option value="split-complementary">Split Complementary</option>
                        </select>
                    </div>
                </div>

                <div class="flex justify-center">
                    <button id="generatePalette" class="px-6 py-3 bg-primary text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold">
                        Generate Palette
                    </button>
                </div>

                <div id="paletteDisplay" class="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <!-- Palette colors will be displayed here -->
                </div>

                <div class="bg-gray-50 p-6 rounded-lg">
                    <h4 class="text-lg font-semibold mb-4">Export Options</h4>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <button id="exportCSS" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
                            Export as CSS
                        </button>
                        <button id="exportJSON" class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors">
                            Export as JSON
                        </button>
                        <button id="exportPNG" class="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors">
                            Export as PNG
                        </button>
                    </div>
                </div>

                <div class="bg-yellow-50 p-4 rounded-lg">
                    <h4 class="font-semibold mb-2">Random Palettes</h4>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-2">
                        <button id="randomWarm" class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors">
                            Warm Colors
                        </button>
                        <button id="randomCool" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
                            Cool Colors
                        </button>
                        <button id="randomPastel" class="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 transition-colors">
                            Pastel Colors
                        </button>
                    </div>
                </div>

                <div id="exportModal" class="hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
                        <div class="p-6">
                            <div class="flex justify-between items-center mb-4">
                                <h3 id="exportTitle" class="text-xl font-bold">Export Palette</h3>
                                <button id="closeExportModal" class="text-gray-500 hover:text-gray-700">
                                    <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                                    </svg>
                                </button>
                            </div>
                            <textarea id="exportContent" class="w-full h-64 px-3 py-2 border border-gray-300 rounded-md font-mono text-sm" readonly></textarea>
                            <div class="mt-4 flex justify-end space-x-2">
                                <button id="copyExport" class="px-4 py-2 bg-primary text-white rounded hover:bg-purple-700 transition-colors">
                                    Copy to Clipboard
                                </button>
                                <button id="downloadExport" class="px-4 py-2 bg-secondary text-white rounded hover:bg-blue-700 transition-colors">
                                    Download File
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    init() {
        this.setupEventListeners();
        this.generatePalette();
    }

    setupEventListeners() {
        document.getElementById('baseColor').addEventListener('input', (e) => {
            document.getElementById('baseColorHex').value = e.target.value;
            this.generatePalette();
        });

        document.getElementById('baseColorHex').addEventListener('input', (e) => {
            const hex = e.target.value;
            if (this.isValidHex(hex)) {
                document.getElementById('baseColor').value = hex;
                this.generatePalette();
            }
        });

        document.getElementById('paletteType').addEventListener('change', () => {
            this.generatePalette();
        });

        document.getElementById('generatePalette').addEventListener('click', () => {
            this.generatePalette();
        });

        document.getElementById('exportCSS').addEventListener('click', () => {
            this.exportPalette('css');
        });

        document.getElementById('exportJSON').addEventListener('click', () => {
            this.exportPalette('json');
        });

        document.getElementById('exportPNG').addEventListener('click', () => {
            this.exportPalette('png');
        });

        document.getElementById('randomWarm').addEventListener('click', () => {
            this.generateRandomPalette('warm');
        });

        document.getElementById('randomCool').addEventListener('click', () => {
            this.generateRandomPalette('cool');
        });

        document.getElementById('randomPastel').addEventListener('click', () => {
            this.generateRandomPalette('pastel');
        });

        document.getElementById('closeExportModal').addEventListener('click', () => {
            this.closeExportModal();
        });

        document.getElementById('copyExport').addEventListener('click', () => {
            this.copyExport();
        });

        document.getElementById('downloadExport').addEventListener('click', () => {
            this.downloadExport();
        });
    }

    generatePalette() {
        const baseColor = document.getElementById('baseColor').value;
        const paletteType = document.getElementById('paletteType').value;
        
        const hsl = this.hexToHsl(baseColor);
        this.currentPalette = this.generateColorPalette(hsl, paletteType);
        
        this.displayPalette();
    }

    generateColorPalette(baseHsl, type) {
        const colors = [];
        const [h, s, l] = baseHsl;
        
        switch (type) {
            case 'monochromatic':
                for (let i = 0; i < 5; i++) {
                    const newL = Math.max(10, Math.min(90, l + (i - 2) * 20));
                    colors.push(this.hslToHex([h, s, newL]));
                }
                break;
                
            case 'analogous':
                for (let i = 0; i < 5; i++) {
                    const newH = (h + (i - 2) * 30 + 360) % 360;
                    colors.push(this.hslToHex([newH, s, l]));
                }
                break;
                
            case 'complementary':
                colors.push(this.hslToHex([h, s, l]));
                colors.push(this.hslToHex([(h + 180) % 360, s, l]));
                colors.push(this.hslToHex([h, s * 0.7, l * 1.2]));
                colors.push(this.hslToHex([(h + 180) % 360, s * 0.7, l * 1.2]));
                colors.push(this.hslToHex([h, s * 0.5, l * 0.8]));
                break;
                
            case 'triadic':
                colors.push(this.hslToHex([h, s, l]));
                colors.push(this.hslToHex([(h + 120) % 360, s, l]));
                colors.push(this.hslToHex([(h + 240) % 360, s, l]));
                colors.push(this.hslToHex([h, s * 0.7, l * 1.2]));
                colors.push(this.hslToHex([(h + 120) % 360, s * 0.7, l * 1.2]));
                break;
                
            case 'tetradic':
                colors.push(this.hslToHex([h, s, l]));
                colors.push(this.hslToHex([(h + 90) % 360, s, l]));
                colors.push(this.hslToHex([(h + 180) % 360, s, l]));
                colors.push(this.hslToHex([(h + 270) % 360, s, l]));
                colors.push(this.hslToHex([h, s * 0.7, l * 1.2]));
                break;
                
            case 'split-complementary':
                colors.push(this.hslToHex([h, s, l]));
                colors.push(this.hslToHex([(h + 150) % 360, s, l]));
                colors.push(this.hslToHex([(h + 210) % 360, s, l]));
                colors.push(this.hslToHex([h, s * 0.7, l * 1.2]));
                colors.push(this.hslToHex([(h + 180) % 360, s * 0.5, l * 0.8]));
                break;
        }
        
        return colors;
    }

    generateRandomPalette(type) {
        let baseHue;
        let baseSat;
        let baseLum;
        
        switch (type) {
            case 'warm':
                baseHue = Math.random() * 60 + 300; // Red to yellow range
                if (baseHue >= 360) baseHue -= 360;
                baseSat = 60 + Math.random() * 40;
                baseLum = 40 + Math.random() * 30;
                break;
            case 'cool':
                baseHue = Math.random() * 120 + 180; // Blue to green range
                baseSat = 60 + Math.random() * 40;
                baseLum = 40 + Math.random() * 30;
                break;
            case 'pastel':
                baseHue = Math.random() * 360;
                baseSat = 20 + Math.random() * 40;
                baseLum = 70 + Math.random() * 20;
                break;
        }
        
        const baseColor = this.hslToHex([baseHue, baseSat, baseLum]);
        document.getElementById('baseColor').value = baseColor;
        document.getElementById('baseColorHex').value = baseColor;
        
        this.generatePalette();
    }

    displayPalette() {
        const container = document.getElementById('paletteDisplay');
        container.innerHTML = '';
        
        this.currentPalette.forEach((color, index) => {
            const colorDiv = document.createElement('div');
            colorDiv.className = 'bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow';
            
            colorDiv.innerHTML = `
                <div class="h-32 w-full" style="background-color: ${color}"></div>
                <div class="p-3">
                    <div class="font-mono text-sm font-semibold">${color.toUpperCase()}</div>
                    <div class="text-xs text-gray-500 mt-1">Click to copy</div>
                </div>
            `;
            
            colorDiv.addEventListener('click', () => {
                this.copyColor(color);
            });
            
            container.appendChild(colorDiv);
        });
    }

    copyColor(color) {
        navigator.clipboard.writeText(color).then(() => {
            // Show temporary feedback
            const notification = document.createElement('div');
            notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50';
            notification.textContent = `Copied ${color}`;
            document.body.appendChild(notification);
            
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 2000);
        });
    }

    exportPalette(format) {
        let content = '';
        let filename = '';
        let title = '';
        
        switch (format) {
            case 'css':
                title = 'CSS Variables';
                filename = 'palette.css';
                content = ':root {\n';
                this.currentPalette.forEach((color, index) => {
                    content += `  --color-${index + 1}: ${color};\n`;
                });
                content += '}\n\n/* Usage examples */\n';
                content += '.primary { color: var(--color-1); }\n';
                content += '.secondary { color: var(--color-2); }\n';
                break;
                
            case 'json':
                title = 'JSON Format';
                filename = 'palette.json';
                const paletteObj = {
                    name: 'Generated Palette',
                    colors: this.currentPalette.map((color, index) => ({
                        name: `color-${index + 1}`,
                        hex: color,
                        rgb: this.hexToRgb(color)
                    }))
                };
                content = JSON.stringify(paletteObj, null, 2);
                break;
                
            case 'png':
                this.exportAsPNG();
                return;
        }
        
        document.getElementById('exportTitle').textContent = title;
        document.getElementById('exportContent').value = content;
        document.getElementById('exportModal').classList.remove('hidden');
        
        // Store for download
        this.exportData = { content, filename };
    }

    exportAsPNG() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = 500;
        canvas.height = 100;
        
        const colorWidth = canvas.width / this.currentPalette.length;
        
        this.currentPalette.forEach((color, index) => {
            ctx.fillStyle = color;
            ctx.fillRect(index * colorWidth, 0, colorWidth, canvas.height);
        });
        
        canvas.toBlob((blob) => {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'color-palette.png';
            a.click();
            URL.revokeObjectURL(url);
        });
    }

    closeExportModal() {
        document.getElementById('exportModal').classList.add('hidden');
    }

    copyExport() {
        const content = document.getElementById('exportContent').value;
        navigator.clipboard.writeText(content).then(() => {
            const button = document.getElementById('copyExport');
            const originalText = button.textContent;
            button.textContent = 'Copied!';
            
            setTimeout(() => {
                button.textContent = originalText;
            }, 2000);
        });
    }

    downloadExport() {
        const blob = new Blob([this.exportData.content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = this.exportData.filename;
        a.click();
        
        URL.revokeObjectURL(url);
    }

    // Utility functions
    isValidHex(hex) {
        return /^#[0-9A-F]{6}$/i.test(hex);
    }

    hexToHsl(hex) {
        const rgb = this.hexToRgb(hex);
        return this.rgbToHsl(rgb.r, rgb.g, rgb.b);
    }

    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    rgbToHsl(r, g, b) {
        r /= 255;
        g /= 255;
        b /= 255;
        
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;
        
        if (max === min) {
            h = s = 0;
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }
        
        return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
    }

    hslToHex([h, s, l]) {
        s /= 100;
        l /= 100;
        
        const c = (1 - Math.abs(2 * l - 1)) * s;
        const x = c * (1 - Math.abs((h / 60) % 2 - 1));
        const m = l - c / 2;
        let r = 0, g = 0, b = 0;
        
        if (0 <= h && h < 60) {
            r = c; g = x; b = 0;
        } else if (60 <= h && h < 120) {
            r = x; g = c; b = 0;
        } else if (120 <= h && h < 180) {
            r = 0; g = c; b = x;
        } else if (180 <= h && h < 240) {
            r = 0; g = x; b = c;
        } else if (240 <= h && h < 300) {
            r = x; g = 0; b = c;
        } else if (300 <= h && h < 360) {
            r = c; g = 0; b = x;
        }
        
        r = Math.round((r + m) * 255);
        g = Math.round((g + m) * 255);
        b = Math.round((b + m) * 255);
        
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }
};

// Whiteboard
window.ToolComponents.Whiteboard = class {
    constructor() {
        this.isDrawing = false;
        this.currentTool = 'pen';
        this.currentColor = '#000000';
        this.currentSize = 3;
        this.lastX = 0;
        this.lastY = 0;
    }

    render() {
        return `
            <div class="space-y-4">
                <div class="text-center">
                    <h3 class="text-2xl font-bold mb-4">Digital Whiteboard</h3>
                    <p class="text-gray-600 mb-6">Draw, sketch, and create on your digital canvas</p>
                </div>

                <div class="bg-gray-100 p-4 rounded-lg">
                    <div class="flex flex-wrap items-center justify-between gap-4">
                        <div class="flex items-center space-x-4">
                            <div class="flex items-center space-x-2">
                                <label class="text-sm font-medium text-gray-700">Tool:</label>
                                <select id="toolSelect" class="px-3 py-1 border border-gray-300 rounded">
                                    <option value="pen">Pen</option>
                                    <option value="eraser">Eraser</option>
                                    <option value="line">Line</option>
                                    <option value="rectangle">Rectangle</option>
                                    <option value="circle">Circle</option>
                                </select>
                            </div>
                            
                            <div class="flex items-center space-x-2">
                                <label class="text-sm font-medium text-gray-700">Color:</label>
                                <input type="color" id="colorPicker" value="#000000" class="w-8 h-8 border border-gray-300 rounded cursor-pointer">
                            </div>
                            
                            <div class="flex items-center space-x-2">
                                <label class="text-sm font-medium text-gray-700">Size:</label>
                                <input type="range" id="sizeSlider" min="1" max="20" value="3" class="w-20">
                                <span id="sizeDisplay" class="text-sm text-gray-600 w-6">3</span>
                            </div>
                        </div>
                        
                        <div class="flex items-center space-x-2">
                            <button id="undoBtn" class="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors">
                                Undo
                            </button>
                            <button id="redoBtn" class="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors">
                                Redo
                            </button>
                            <button id="clearBtn" class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors">
                                Clear
                            </button>
                            <button id="saveBtn" class="px-3 py-1 bg-primary text-white rounded hover:bg-purple-700 transition-colors">
                                Save
                            </button>
                        </div>
                    </div>
                </div>

                <div class="border-2 border-gray-300 rounded-lg overflow-hidden bg-white">
                    <canvas id="whiteboard" width="800" height="600" class="block cursor-crosshair"></canvas>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div class="bg-blue-50 p-4 rounded-lg">
                        <h4 class="font-semibold mb-2">Drawing Tools</h4>
                        <ul class="text-sm space-y-1">
                            <li>✓ Pen for freehand drawing</li>
                            <li>✓ Eraser to remove content</li>
                            <li>✓ Shapes (line, rectangle, circle)</li>
                            <li>✓ Adjustable brush size</li>
                        </ul>
                    </div>
                    
                    <div class="bg-green-50 p-4 rounded-lg">
                        <h4 class="font-semibold mb-2">Features</h4>
                        <ul class="text-sm space-y-1">
                            <li>✓ Unlimited colors</li>
                            <li>✓ Undo/Redo functionality</li>
                            <li>✓ Save as PNG image</li>
                            <li>✓ Responsive canvas</li>
                        </ul>
                    </div>
                    
                    <div class="bg-yellow-50 p-4 rounded-lg">
                        <h4 class="font-semibold mb-2">Quick Tips</h4>
                        <ul class="text-sm space-y-1">
                            <li>• Hold shift for straight lines</li>
                            <li>• Use larger brush for filling</li>
                            <li>• Right-click to access menu</li>
                            <li>• Double-click to clear canvas</li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
    }

    init() {
        this.canvas = document.getElementById('whiteboard');
        this.ctx = this.canvas.getContext('2d');
        this.history = [];
        this.historyStep = -1;
        
        // Set canvas size to fit container
        this.resizeCanvas();
        
        // Initialize drawing state
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
        
        // Save initial state
        this.saveState();
        
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Tool controls
        document.getElementById('toolSelect').addEventListener('change', (e) => {
            this.currentTool = e.target.value;
            this.updateCursor();
        });

        document.getElementById('colorPicker').addEventListener('change', (e) => {
            this.currentColor = e.target.value;
        });

        document.getElementById('sizeSlider').addEventListener('input', (e) => {
            this.currentSize = parseInt(e.target.value);
            document.getElementById('sizeDisplay').textContent = this.currentSize;
        });

        // Action buttons
        document.getElementById('undoBtn').addEventListener('click', () => {
            this.undo();
        });

        document.getElementById('redoBtn').addEventListener('click', () => {
            this.redo();
        });

        document.getElementById('clearBtn').addEventListener('click', () => {
            this.clearCanvas();
        });

        document.getElementById('saveBtn').addEventListener('click', () => {
            this.saveImage();
        });

        // Canvas events
        this.canvas.addEventListener('mousedown', (e) => {
            this.startDrawing(e);
        });

        this.canvas.addEventListener('mousemove', (e) => {
            this.draw(e);
        });

        this.canvas.addEventListener('mouseup', () => {
            this.stopDrawing();
        });

        this.canvas.addEventListener('mouseout', () => {
            this.stopDrawing();
        });

        // Touch events for mobile
        this.canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            const mouseEvent = new MouseEvent('mousedown', {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
            this.canvas.dispatchEvent(mouseEvent);
        });

        this.canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            const mouseEvent = new MouseEvent('mousemove', {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
            this.canvas.dispatchEvent(mouseEvent);
        });

        this.canvas.addEventListener('touchend', (e) => {
            e.preventDefault();
            const mouseEvent = new MouseEvent('mouseup', {});
            this.canvas.dispatchEvent(mouseEvent);
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch (e.key) {
                    case 'z':
                        e.preventDefault();
                        if (e.shiftKey) {
                            this.redo();
                        } else {
                            this.undo();
                        }
                        break;
                    case 'y':
                        e.preventDefault();
                        this.redo();
                        break;
                }
            }
        });

        // Window resize
        window.addEventListener('resize', () => {
            this.resizeCanvas();
        });
    }

    resizeCanvas() {
        const container = this.canvas.parentElement;
        const rect = container.getBoundingClientRect();
        
        // Save current drawing
        const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        
        // Resize canvas
        this.canvas.width = Math.min(800, rect.width - 20);
        this.canvas.height = 600;
        
        // Restore drawing
        this.ctx.putImageData(imageData, 0, 0);
        
        // Reset drawing properties
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
    }

    getMousePos(e) {
        const rect = this.canvas.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    }

    startDrawing(e) {
        this.isDrawing = true;
        const pos = this.getMousePos(e);
        this.lastX = pos.x;
        this.lastY = pos.y;
        
        if (this.currentTool === 'pen' || this.currentTool === 'eraser') {
            this.ctx.beginPath();
            this.ctx.moveTo(pos.x, pos.y);
        }
        
        this.startX = pos.x;
        this.startY = pos.y;
    }

    draw(e) {
        if (!this.isDrawing) return;
        
        const pos = this.getMousePos(e);
        
        this.ctx.lineWidth = this.currentSize;
        
        switch (this.currentTool) {
            case 'pen':
                this.ctx.globalCompositeOperation = 'source-over';
                this.ctx.strokeStyle = this.currentColor;
                this.ctx.lineTo(pos.x, pos.y);
                this.ctx.stroke();
                break;
                
            case 'eraser':
                this.ctx.globalCompositeOperation = 'destination-out';
                this.ctx.lineTo(pos.x, pos.y);
                this.ctx.stroke();
                break;
                
            case 'line':
                this.redrawCanvas();
                this.ctx.globalCompositeOperation = 'source-over';
                this.ctx.strokeStyle = this.currentColor;
                this.ctx.beginPath();
                this.ctx.moveTo(this.startX, this.startY);
                this.ctx.lineTo(pos.x, pos.y);
                this.ctx.stroke();
                break;
                
            case 'rectangle':
                this.redrawCanvas();
                this.ctx.globalCompositeOperation = 'source-over';
                this.ctx.strokeStyle = this.currentColor;
                this.ctx.strokeRect(this.startX, this.startY, pos.x - this.startX, pos.y - this.startY);
                break;
                
            case 'circle':
                this.redrawCanvas();
                this.ctx.globalCompositeOperation = 'source-over';
                this.ctx.strokeStyle = this.currentColor;
                const radius = Math.sqrt(Math.pow(pos.x - this.startX, 2) + Math.pow(pos.y - this.startY, 2));
                this.ctx.beginPath();
                this.ctx.arc(this.startX, this.startY, radius, 0, 2 * Math.PI);
                this.ctx.stroke();
                break;
        }
        
        this.lastX = pos.x;
        this.lastY = pos.y;
    }

    stopDrawing() {
        if (this.isDrawing) {
            this.isDrawing = false;
            this.saveState();
        }
    }

    redrawCanvas() {
        if (this.history.length > 0) {
            const img = new Image();
            img.onload = () => {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.ctx.drawImage(img, 0, 0);
            };
            img.src = this.history[this.historyStep];
        }
    }

    saveState() {
        this.historyStep++;
        if (this.historyStep < this.history.length) {
            this.history.length = this.historyStep;
        }
        this.history.push(this.canvas.toDataURL());
    }

    undo() {
        if (this.historyStep > 0) {
            this.historyStep--;
            this.restoreState();
        }
    }

    redo() {
        if (this.historyStep < this.history.length - 1) {
            this.historyStep++;
            this.restoreState();
        }
    }

    restoreState() {
        const img = new Image();
        img.onload = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.drawImage(img, 0, 0);
        };
        img.src = this.history[this.historyStep];
    }

    clearCanvas() {
        if (confirm('Are you sure you want to clear the canvas?')) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.saveState();
        }
    }

    saveImage() {
        const link = document.createElement('a');
        link.download = 'whiteboard-drawing.png';
        link.href = this.canvas.toDataURL();
        link.click();
    }

    updateCursor() {
        switch (this.currentTool) {
            case 'pen':
                this.canvas.style.cursor = 'crosshair';
                break;
            case 'eraser':
                this.canvas.style.cursor = 'grab';
                break;
            default:
                this.canvas.style.cursor = 'crosshair';
        }
    }
};