/**
 * MD → Web Preview App
 * A lightweight markdown editor with live preview
 */

// ============================================
// Configuration & State
// ============================================

const DEBOUNCE_DELAY = 200; // milliseconds
let debounceTimer = null;

// Sample Markdown
const SAMPLE_MARKDOWN = `# Welcome to MD → Web Preview

A lightweight, fast markdown editor with live preview.

## Features

- ⚡ **Live Preview**: See your markdown rendered in real-time
- 🎨 **Dark Mode**: Easy on the eyes with beautiful dark theme
- 📋 **Copy HTML**: Export your rendered content with one click
- 🔒 **Secure**: HTML sanitization with DOMPurify
- ⌨️ **Keyboard Shortcuts**: Productivity-focused workflow

## Formatting Examples

### Text Styling

You can make text **bold**, *italic*, ***bold and italic***, ~~strikethrough~~, or \`inline code\`.

### Lists

**Unordered list:**
- First item
- Second item
  - Nested item
  - Another nested item
- Third item

**Ordered list:**
1. First step
2. Second step
3. Third step

**Task list:**
- [x] Completed task
- [ ] Pending task
- [ ] Another pending task

### Code Blocks

\`\`\`javascript
function greet(name) {
    return \`Hello, \${name}!\`;
}

console.log(greet('World'));
\`\`\`

### Blockquotes

> "The best way to predict the future is to invent it."
>
> — Alan Kay

### Tables

| Feature | Status | Priority |
|---------|--------|----------|
| Live Preview | ✅ Done | High |
| Dark Mode | ✅ Done | High |
| Export HTML | ✅ Done | Medium |
| Syntax Highlighting | 📝 Planned | Low |

### Links & Images

Check out the [Markdown Guide](https://www.markdownguide.org/) for more syntax.

---

## Keyboard Shortcuts

- **Copy HTML**: \`Ctrl/Cmd + C\` (when preview focused)
- **Clear**: \`Ctrl/Cmd + K\`
- **Tab**: Insert indentation in editor

---

**Happy writing!** 🚀
`;

// ============================================
// DOM Elements
// ============================================

const markdownInput = document.getElementById('markdownInput');
const htmlPreview = document.getElementById('htmlPreview');
const copyHtmlBtn = document.getElementById('copyHtmlBtn');
const copyMarkdownBtn = document.getElementById('copyMarkdownBtn');
const clearBtn = document.getElementById('clearBtn');
const themeToggle = document.getElementById('themeToggle');

// ============================================
// Markdown Rendering with Security
// ============================================

/**
 * Renders markdown to sanitized HTML
 * @param {string} markdown - Raw markdown text
 * @returns {string} - Sanitized HTML
 */
function renderMarkdown(markdown) {
    if (!markdown.trim()) {
        return '<p style="color: var(--text-muted); text-align: center; padding: 2rem;">Start typing to see the preview...</p>';
    }

    try {
        // Configure marked.js options
        marked.setOptions({
            breaks: true,          // GitHub-flavored line breaks
            gfm: true,            // GitHub-flavored markdown
            headerIds: true,      // Add IDs to headers
            mangle: false,        // Don't escape autolinked email addresses
            pedantic: false,      // Don't be too strict
            sanitize: false,      // We'll use DOMPurify for sanitization
            smartLists: true,     // Smarter list behavior
            smartypants: false,   // Don't use smart punctuation
            xhtml: false          // Don't self-close tags
        });

        // Parse markdown to HTML
        const rawHtml = marked.parse(markdown);

        // Sanitize HTML with DOMPurify
        const cleanHtml = DOMPurify.sanitize(rawHtml, {
            ALLOWED_TAGS: [
                'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
                'p', 'br', 'hr',
                'strong', 'em', 'u', 's', 'del', 'ins', 'mark', 'code', 'pre',
                'a', 'img',
                'ul', 'ol', 'li',
                'table', 'thead', 'tbody', 'tr', 'th', 'td',
                'blockquote',
                'div', 'span',
                'input' // For task lists
            ],
            ALLOWED_ATTR: [
                'href', 'src', 'alt', 'title',
                'class', 'id',
                'type', 'checked', 'disabled' // For task lists
            ],
            ALLOW_DATA_ATTR: false
        });

        return cleanHtml;
    } catch (error) {
        console.error('Error rendering markdown:', error);
        return '<p style="color: red;">Error rendering markdown. Please check your syntax.</p>';
    }
}

/**
 * Updates the preview with debouncing
 * @param {string} markdown - Raw markdown text
 */
function updatePreview(markdown) {
    // Clear previous timer
    clearTimeout(debounceTimer);

    // Set new timer
    debounceTimer = setTimeout(() => {
        const html = renderMarkdown(markdown);
        htmlPreview.innerHTML = html;

        // Add fade-in animation
        htmlPreview.classList.remove('fade-in');
        void htmlPreview.offsetWidth; // Trigger reflow
        htmlPreview.classList.add('fade-in');
    }, DEBOUNCE_DELAY);
}

// ============================================
// Clipboard Operations
// ============================================

/**
 * Copies text to clipboard with user feedback
 * @param {string} text - Text to copy
 * @param {HTMLElement} button - Button element for feedback
 * @param {string} successMsg - Success message
 */
async function copyToClipboard(text, button, successMsg) {
    try {
        await navigator.clipboard.writeText(text);

        // Visual feedback
        const originalText = button.innerHTML;
        button.innerHTML = '<span class="btn-icon">✅</span>' + successMsg;
        button.disabled = true;

        setTimeout(() => {
            button.innerHTML = originalText;
            button.disabled = false;
        }, 2000);
    } catch (error) {
        console.error('Failed to copy:', error);
        alert('Failed to copy to clipboard. Please try again.');
    }
}

/**
 * Copies rendered HTML to clipboard
 */
function copyHtml() {
    const html = htmlPreview.innerHTML;

    if (!html || html.includes('Start typing to see the preview')) {
        alert('Nothing to copy! Please write some markdown first.');
        return;
    }

    copyToClipboard(html, copyHtmlBtn, 'Copied!');
}

/**
 * Copies raw markdown to clipboard
 */
function copyMarkdown() {
    const markdown = markdownInput.value;

    if (!markdown.trim()) {
        alert('Nothing to copy! Please write some markdown first.');
        return;
    }

    copyToClipboard(markdown, copyMarkdownBtn, 'Copied!');
}

// ============================================
// Editor Operations
// ============================================

/**
 * Clears the editor and preview
 */
function clearEditor() {
    if (markdownInput.value.trim() && !confirm('Are you sure you want to clear everything?')) {
        return;
    }

    markdownInput.value = '';
    updatePreview('');
    markdownInput.focus();
}

/**
 * Handles Tab key for indentation
 * @param {KeyboardEvent} e - Keyboard event
 */
function handleTabKey(e) {
    if (e.key === 'Tab') {
        e.preventDefault();

        const start = markdownInput.selectionStart;
        const end = markdownInput.selectionEnd;
        const value = markdownInput.value;

        // Insert tab (4 spaces)
        markdownInput.value = value.substring(0, start) + '    ' + value.substring(end);

        // Move cursor after the tab
        markdownInput.selectionStart = markdownInput.selectionEnd = start + 4;
    }
}

// ============================================
// Theme Toggle
// ============================================

/**
 * Initializes theme from localStorage
 */
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.body.classList.add('dark-mode');
        updateThemeIcon(true);
    }
}

/**
 * Toggles dark/light mode
 */
function toggleTheme() {
    const isDark = document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeIcon(isDark);
}

/**
 * Updates theme toggle icon
 * @param {boolean} isDark - Whether dark mode is active
 */
function updateThemeIcon(isDark) {
    const themeIcon = themeToggle.querySelector('.theme-icon');
    themeIcon.textContent = isDark ? '☀️' : '🌙';
}

// ============================================
// Keyboard Shortcuts
// ============================================

/**
 * Handles global keyboard shortcuts
 * @param {KeyboardEvent} e - Keyboard event
 */
function handleKeyboardShortcuts(e) {
    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    const cmdOrCtrl = isMac ? e.metaKey : e.ctrlKey;

    // Ctrl/Cmd + K: Clear
    if (cmdOrCtrl && e.key === 'k') {
        e.preventDefault();
        clearEditor();
    }

    // Ctrl/Cmd + C when preview is focused: Copy HTML
    if (cmdOrCtrl && e.key === 'c' && document.activeElement === htmlPreview) {
        e.preventDefault();
        copyHtml();
    }
}

// ============================================
// Local Storage (Auto-save)
// ============================================

/**
 * Saves content to localStorage
 */
function saveContent() {
    try {
        localStorage.setItem('markdown-content', markdownInput.value);
    } catch (error) {
        console.warn('Failed to save to localStorage:', error);
    }
}

/**
 * Loads content from localStorage
 */
function loadSavedContent() {
    try {
        const saved = localStorage.getItem('markdown-content');
        if (saved !== null && saved !== '') {
            markdownInput.value = saved;
            updatePreview(saved);
        } else {
            // Load sample markdown if no saved content
            markdownInput.value = SAMPLE_MARKDOWN;
            updatePreview(SAMPLE_MARKDOWN);
        }
    } catch (error) {
        console.warn('Failed to load from localStorage:', error);
        markdownInput.value = SAMPLE_MARKDOWN;
        updatePreview(SAMPLE_MARKDOWN);
    }
}

// ============================================
// Event Listeners
// ============================================

// Input event: Update preview and save
markdownInput.addEventListener('input', (e) => {
    updatePreview(e.target.value);
    saveContent();
});

// Tab key: Insert indentation
markdownInput.addEventListener('keydown', handleTabKey);

// Copy buttons
copyHtmlBtn.addEventListener('click', copyHtml);
copyMarkdownBtn.addEventListener('click', copyMarkdown);

// Clear button
clearBtn.addEventListener('click', clearEditor);

// Theme toggle
themeToggle.addEventListener('click', toggleTheme);

// Global keyboard shortcuts
document.addEventListener('keydown', handleKeyboardShortcuts);

// Make preview focusable for keyboard shortcuts
htmlPreview.setAttribute('tabindex', '0');

// ============================================
// Initialization
// ============================================

/**
 * Initializes the application
 */
function init() {
    console.log('🚀 MD → Web Preview initialized');

    // Initialize theme
    initializeTheme();

    // Load saved content or sample markdown
    loadSavedContent();

    // Focus editor
    markdownInput.focus();

    // Set cursor to start
    markdownInput.setSelectionRange(0, 0);
}

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
