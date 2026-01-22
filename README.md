# Ti.GenAI - Google ML Kit GenAI Module for Titanium SDK

![Titanium](https://img.shields.io/badge/Titanium-13.0+-red.svg) ![Platform](https://img.shields.io/badge/platform-Android-green.svg)  
![License](https://img.shields.io/badge/license-MIT-blue.svg) ![API](https://img.shields.io/badge/API-26+-orange.svg) ![Maintained](https://img.shields.io/badge/Maintained-Yes-green.svg)

Titanium SDK module for Googles ML Kit GenAI https://developers.google.com/ml-kit/genai

For an iOS AI module have a look at https://github.com/deckameron/Ti.Apple.Intelligence


### Bring Google's powerful on-device AI to your Titanium apps

Run Gemini Nano locally for proofreading, rewriting, summarization, and image descriptions - all offline, private, and fast.

[Features](https://github.com/m1ga/ti.genai?tab=readme-ov-file#-features) • [Installation](https://github.com/m1ga/ti.genai?tab=readme-ov-file#-installation) • [Quick Start](https://github.com/m1ga/ti.genai?tab=readme-ov-file#-quick-start) • [Documentation](https://github.com/m1ga/ti.genai?tab=readme-ov-file#-documentation) • [Examples](https://github.com/m1ga/ti.genai?tab=readme-ov-file#-examples)

---

## Why Ti.GenAI?

Building AI-powered features traditionally requires:
- ❌ Cloud API costs per request
- ❌ Internet connectivity
- ❌ Privacy concerns sending data externally
- ❌ Complex backend infrastructure

**Ti.GenAI changes this:**

- ✅ **100% On-Device** - All processing happens locally using Gemini Nano
- ✅ **Zero Cloud Costs** - No per-request fees, unlimited usage
- ✅ **Works Offline** - Full functionality without internet
- ✅ **Privacy First** - User data never leaves the device
- ✅ **Production Ready** - Built on Google's ML Kit with proven quality
- ✅ **Simple API** - Clean, event-driven interface for Titanium

## Features

Ti.GenAI provides 4 powerful on-device AI capabilities:

| Feature | Description | Use Cases |
|---------|-------------|-----------|
| **📝 Proofreading** | Fix grammar and spelling errors | Email composition, chat messages, forms |
| **✍️ Rewriting** | Transform text in 6 different styles | Social posts, professional emails, tone adjustment |
| **📄 Summarization** | Generate 1-3 bullet point summaries | Article TL;DR, email previews, content digests |
| **🖼️ Image Description** | Generate alt text from images | Accessibility, image search, content organization |

### Rewriting Styles

- **Elaborate** - Add more detail and context
- **Professional** - Formal business tone
- **Shorten** - Make it concise
- **Friendly** - Casual, warm tone
- **Emojify** - Add relevant emojis
- **Rephrase** - Say it differently

## Minimum Requirements

- Android API Level 26+ (Android 8.0)
- Device must support AICore/Gemini Nano

> **Note:** The module gracefully handles unsupported devices by firing error events. Always check device compatibility before showing AI features to users.

⚠️ **IMPORTANT**: Requires real Android device with AICore/Gemini Nano support. It doesn't work on emulators!

### Language Support

| Language | Proofreading | Rewriting | Summarization |
|----------|-------------|-----------|---------------|
| English | ✅ | ✅ | ✅ |
| Japanese | ✅ | ✅ | ✅ |
| Korean | ✅ | ✅ | ✅ |
| German | ✅ | ✅ | ❌ |
| French | ✅ | ✅ | ❌ |
| Italian | ✅ | ✅ | ❌ |
| Spanish | ✅ | ✅ | ❌ |

## Installation

### 1. Add Module to Your Project

Download the latest module from [Releases](https://github.com/m1ga/ti.genai/releases) and add to `tiapp.xml`:

```xml
<modules>
    <module platform="android">ti.genai</module>
</modules>
```

### 2. Update Build Configuration

**tiapp.xml** - Set minimum Android API:
```xml
<android xmlns:android="http://schemas.android.com/apk/res/android">
    <manifest>
        <uses-sdk android:minSdkVersion="26" android:targetSdkVersion="35"/>
    </manifest>
</android>
```

### 3. Require in Your Code

```javascript
var GenAI = require('ti.genai');
```

## Quick Start

### Proofread Text
```javascript
var GenAI = require('ti.genai');

// Listen for results
GenAI.addEventListener('streamChunk', function(e) {
    if (e.operation === 'proofreading') {
        console.log('Corrected: ' + e.text);
        textField.value = e.text; // Update UI in real-time
    }
});

GenAI.addEventListener('error', function(e) {
    alert('Error: ' + e.error);
});

// Proofread text
GenAI.proofread({
    text: 'The praject is compleet but needs too be reviewd',
    language: GenAI.LANG_ENGLISH,
    streaming: true
});
```

### Rewrite in Different Styles
```javascript
GenAI.addEventListener('success', function(e) {
    if (e.operation === 'rewriting') {
        console.log('Rewritten: ' + e.text);
    }
});

GenAI.rewrite({
    text: 'Hey, can we meet tomorrow?',
    outputType: GenAI.PROFESSIONAL,
    streaming: false
});
// Result: "I would like to schedule a meeting with you tomorrow."
```

### Summarize Articles
```javascript
GenAI.addEventListener('streamChunk', function(e) {
    if (e.operation === 'summarization') {
        summaryLabel.text += e.text; // Stream summary as it generates
    }
});

GenAI.summarize({
    text: longArticleText,
    outputType: GenAI.TWO_BULLETS,
    inputType: GenAI.ARTICLE,
    language: GenAI.LANG_ENGLISH
});
```

### Describe Images
```javascript
var imageBlob = imageView.toBlob();

GenAI.addEventListener('success', function(e) {
    if (e.operation === 'imageDescription') {
        altTextLabel.text = e.text;
    }
});

GenAI.describeImage({
    image: imageBlob,
    streaming: false
});
```

## Documentation

### Constants

#### Output Types - Rewriting
```javascript
GenAI.ELABORATE      // Add more detail
GenAI.PROFESSIONAL   // Formal business tone
GenAI.SHORTEN       // Make it concise
GenAI.FRIENDLY      // Casual, warm tone
GenAI.EMOJIFY       // Add emojis
GenAI.REPHRASE      // Say it differently
```

#### Output Types - Summarization
```javascript
GenAI.ONE_BULLET    // Single bullet summary
GenAI.TWO_BULLETS   // Two bullet points
GenAI.THREE_BULLETS // Three bullet points
```

#### Input Types
```javascript
GenAI.ARTICLE       // For articles/documents
GenAI.CONVERSATION  // For chat/messages
GenAI.KEYBOARD      // Text from keyboard
GenAI.VOICE         // Text from voice input
```

#### Languages
```javascript
GenAI.LANG_ENGLISH
GenAI.LANG_JAPANESE
GenAI.LANG_KOREAN
GenAI.LANG_GERMAN
GenAI.LANG_FRENCH
GenAI.LANG_ITALIAN
GenAI.LANG_SPANISH
```

#### Feature Status
```javascript
GenAI.STATUS_UNAVAILABLE  // Feature not available on device
GenAI.STATUS_DOWNLOADABLE // Model needs download
GenAI.STATUS_DOWNLOADING  // Model is downloading
GenAI.STATUS_AVAILABLE    // Model ready to use
```

---

### Methods

#### `proofread(options)`

Fix grammar and spelling errors in text.

```javascript
GenAI.proofread({
    text: String,           // Required: Text to proofread
    language: Number,       // Optional: Language constant (default: LANG_ENGLISH)
    inputType: Number,      // Optional: KEYBOARD or VOICE (default: KEYBOARD)
    streaming: Boolean      // Optional: Stream results (default: true)
});
```

**Events Fired:**
- `statusChange` - When feature status changes
- `downloadProgress` - During model download
- `streamChunk` - For each text chunk (if streaming: true)
- `success` - Final result (if streaming: false)
- `error` - On failure

**Example:**
```javascript
GenAI.proofread({
    text: 'I has went to the stor yesterday',
    language: GenAI.LANG_ENGLISH,
    inputType: GenAI.KEYBOARD,
    streaming: true
});
```

---

#### `rewrite(options)`

Transform text into different tones and styles.

```javascript
GenAI.rewrite({
    text: String,           // Required: Text to rewrite
    outputType: Number,     // Optional: Style constant (default: ELABORATE)
    language: Number,       // Optional: Language constant (default: LANG_ENGLISH)
    streaming: Boolean      // Optional: Stream results (default: true)
});
```

**Output Types:**
- `ELABORATE` - Add detail and context
- `PROFESSIONAL` - Formal business tone
- `SHORTEN` - Make concise
- `FRIENDLY` - Casual, warm tone
- `EMOJIFY` - Add relevant emojis
- `REPHRASE` - Different phrasing

**Example:**
```javascript
GenAI.rewrite({
    text: 'Thanks for your help!',
    outputType: GenAI.PROFESSIONAL,
    language: GenAI.LANG_ENGLISH,
    streaming: false
});
// Result: "Thank you for your assistance."
```

---

#### `summarize(options)`

Generate bullet-point summaries of articles or conversations.

```javascript
GenAI.summarize({
    text: String,           // Required: Text to summarize
    outputType: Number,     // Optional: Bullet count (default: ONE_BULLET)
    inputType: Number,      // Optional: ARTICLE or CONVERSATION (default: ARTICLE)
    language: Number,       // Optional: Language constant (default: LANG_ENGLISH)
    streaming: Boolean      // Optional: Stream results (default: true)
});
```

**Best Practices:**
- Keep text under 4000 tokens (~3000 English words)
- Use first few paragraphs for long articles
- Choose correct inputType for better results

**Example:**
```javascript
GenAI.summarize({
    text: longArticle,
    outputType: GenAI.THREE_BULLETS,
    inputType: GenAI.ARTICLE,
    language: GenAI.LANG_ENGLISH
});
```

---

#### `describeImage(options)`

Generate text descriptions of images for accessibility and search.

```javascript
GenAI.describeImage({
    image: TiBlob,         // Required: Image as TiBlob
    streaming: Boolean     // Optional: Stream results (default: true)
});
```

**Use Cases:**
- Generate alt text for accessibility
- Create searchable image metadata
- Describe images when user can't see screen
- Auto-tag photo libraries

**Example:**
```javascript
var photo = imageView.toBlob();

GenAI.describeImage({
    image: photo,
    streaming: false
});
// Result: "A golden retriever playing in a sunny park"
```

---

#### `cleanup()`

Release all AI model resources. Call when done using GenAI features.

```javascript
GenAI.cleanup();
```

**When to call:**
- Window is closing
- User navigates away from AI features
- App is backgrounding
- Memory pressure

**Example:**
```javascript
win.addEventListener('close', function() {
    GenAI.cleanup();
});
```

---

### Events

#### `statusChange`

Fired when feature availability status changes.

```javascript
{
    operation: String,    // 'proofreading', 'rewriting', 'summarization', 'imageDescription'
    status: Number,       // STATUS_* constant
    statusName: String    // Human-readable status
}
```

**Example:**
```javascript
GenAI.addEventListener('statusChange', function(e) {
    console.log(e.operation + ' is now ' + e.statusName);
    
    if (e.status === GenAI.STATUS_DOWNLOADABLE) {
        // Show "Downloading AI model..." to user
    }
});
```

---

#### `downloadProgress`

Fired during model download with progress information.

```javascript
{
    operation: String,      // Feature being downloaded
    phase: String,          // 'started', 'downloading', 'completed'
    downloaded: Number,     // Bytes downloaded (if available)
    total: Number,          // Total bytes (if available)
    progress: Number        // Progress 0.0-1.0 (if available)
}
```

**Example:**
```javascript
GenAI.addEventListener('downloadProgress', function(e) {
    if (e.phase === 'downloading' && e.progress) {
        progressBar.value = e.progress * 100;
        label.text = Math.round(e.progress * 100) + '%';
    }
});
```

---

#### `streamChunk`

Fired for each chunk of generated text (when streaming: true).

```javascript
{
    operation: String,    // Feature name
    text: String          // Text chunk
}
```

**Example:**
```javascript
var fullText = '';

GenAI.addEventListener('streamChunk', function(e) {
    if (e.operation === 'summarization') {
        fullText += e.text;
        textView.value = fullText; // Update UI in real-time
    }
});
```

---

#### `success`

Fired with complete result (when streaming: false).

```javascript
{
    operation: String,    // Feature name
    text: String,         // Complete result
    success: Boolean      // Always true
}
```

**Example:**
```javascript
GenAI.addEventListener('success', function(e) {
    console.log('Final result: ' + e.text);
    resultLabel.text = e.text;
});
```

---

#### `error`

Fired when an error occurs.

```javascript
{
    operation: String,    // Feature that failed
    error: String,        // Error message
    success: Boolean      // Always false
}
```

**Common Errors:**
- Feature unavailable on device
- Model download failed
- Inference quota exceeded
- Invalid input parameters

**Example:**
```javascript
GenAI.addEventListener('error', function(e) {
    if (e.error.includes('unavailable')) {
        alert('AI features not supported on this device');
    } else if (e.error.includes('quota')) {
        alert('Too many AI requests. Please wait a moment.');
    } else {
        alert('Error: ' + e.error);
    }
});
```

---

## Examples

### Complete Email Proofreader

```javascript
var GenAI = require('ti.genai');

function createEmailComposer() {

    var win = Ti.UI.createWindow({
        backgroundColor: '#fff'
    });
    
    win.addEventListener('close', function() {
        GenAI.cleanup();
    });
    
    var emailField = Ti.UI.createTextArea({
        top: 20,
        left: 20,
        right: 20,
        height: 200,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        padding: { left: 10, top: 10 }
    });
    win.add(emailField);
    
    var proofreadBtn = Ti.UI.createButton({
        title: 'Proofread',
        top: 240,
        height: 50,
        left: 20,
        right: 20,
        backgroundColor: '#007AFF',
        color: '#fff'
    });
    win.add(proofreadBtn);
    
    var statusLabel = Ti.UI.createLabel({
        top: 310,
        left: 20,
        right: 20,
        height: Ti.UI.SIZE,
        textAlign: 'center',
        color: '#666'
    });
    win.add(statusLabel);
    
    // Event listeners
    GenAI.addEventListener('statusChange', function(e) {
        if (e.operation === 'proofreading') {
            statusLabel.text = 'Status: ' + e.statusName;
        }
    });
    
    GenAI.addEventListener('downloadProgress', function(e) {
        if (e.operation === 'proofreading' && e.progress) {
            statusLabel.text = 'Downloading AI model: ' + Math.round(e.progress * 100) + '%';
        }
    });
    
    GenAI.addEventListener('streamChunk', function(e) {
        if (e.operation === 'proofreading') {
            emailField.value = e.text;
            statusLabel.text = 'Proofreading...';
        }
    });
    
    GenAI.addEventListener('error', function(e) {
        if (e.operation === 'proofreading') {
            statusLabel.text = 'Error: ' + e.error;
            statusLabel.color = '#f00';
        }
    });
    
    proofreadBtn.addEventListener('click', function() {
        if (!emailField.value) {
            alert('Please enter some text first');
            return;
        }
        
        statusLabel.text = 'Processing...';
        statusLabel.color = '#666';
        
        GenAI.proofread({
            text: emailField.value,
            language: GenAI.LANG_ENGLISH,
            streaming: true
        });
    });
    
    return win;
}

var emailWin = createEmailComposer();
emailWin.open();
```

---

### Social Media Post Rewriter

```javascript
function createPostRewriter() {

    var win = Ti.UI.createWindow({ backgroundColor: '#F5F5F5' });
    
    var styles = [
        { title: 'Professional', type: GenAI.PROFESSIONAL },
        { title: 'Friendly', type: GenAI.FRIENDLY },
        { title: 'Emojify', type: GenAI.EMOJIFY },
        { title: 'Shorten', type: GenAI.SHORTEN }
    ];
    
    var postField = Ti.UI.createTextArea({
        top: 20,
        left: 20,
        right: 20,
        height: 150,
        hintText: 'Write your post...',
        borderRadius: 8,
        backgroundColor: '#FFFFFF',
        padding: { left: 10, top: 10 }
    });
    win.add(postField);
    
    var buttonsContainer = Ti.UI.createView({
        top: 190,
        left: 20,
        right: 20,
        height: 120,
        layout: 'horizontal'
    });
    win.add(buttonsContainer);
    
    styles.forEach(function(style) {
        var btn = Ti.UI.createButton({
            title: style.title,
            width: '48%',
            height: 50,
            left: '1%',
            top: 5,
            backgroundColor: '#007AFF',
            color: '#FFFFFF'
        });
        
        btn.addEventListener('click', function() {
            GenAI.rewrite({
                text: postField.value,
                outputType: style.type,
                streaming: false
            });
        });
        
        buttonsContainer.add(btn);
    });
    
    var resultField = Ti.UI.createTextArea({
        top: 330,
        left: 20,
        right: 20,
        height: 150,
        editable: false,
        borderRadius: 8,
        backgroundColor: '#E8F5E9',
        padding: { left: 10, top: 10 }
    });
    win.add(resultField);
    
    GenAI.addEventListener('success', function(e) {
        if (e.operation === 'rewriting') {
            resultField.value = e.text;
        }
    });

    return win;
}
```

---

### Article Summarizer with Progress

```javascript
function createArticleSummarizer(articleText) {

    var win = Ti.UI.createWindow({ backgroundColor: '#FFFFFF' });
    
    var summaryLabel = Ti.UI.createLabel({
        top: 20,
        left: 20,
        right: 20,
        height: Ti.UI.SIZE,
        font: { fontSize: 16 },
        color: '#333333'
    });
    
    var progressBar = Ti.UI.createProgressBar({
        top: 100,
        left: 20,
        right: 20,
        height: 4,
        min: 0,
        max: 100,
        value: 0,
        tintColor: '#007AFF',
        trackTintColor: '#E0E0E0'
    });
    
    var statusLabel = Ti.UI.createLabel({
        top: 120,
        left: 20,
        right: 20,
        height: Ti.UI.SIZE,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        font: { fontSize: 14 },
        color: '#666666'
    });
    
    // Download progress
    GenAI.addEventListener('downloadProgress', function(e) {
        if (e.operation === 'summarization') {
            if (e.phase === 'started') {
                statusLabel.text = 'Downloading AI model...';
                progressBar.show();
            } else if (e.phase === 'downloading' && e.progress) {
                progressBar.value = e.progress * 100;
            } else if (e.phase === 'completed') {
                statusLabel.text = 'Generating summary...';
                progressBar.hide();
            }
        }
    });
    
    // Stream summary
    var fullSummary = '';
    GenAI.addEventListener('streamChunk', function(e) {
        if (e.operation === 'summarization') {
            fullSummary += e.text;
            summaryLabel.text = fullSummary;
            statusLabel.text = 'Generating...';
        }
    });
    
    GenAI.addEventListener('error', function(e) {
        if (e.operation === 'summarization') {
            statusLabel.text = 'Error: ' + e.error;
            statusLabel.color = '#FF0000';
        }
    });
    
    win.add(summaryLabel);
    win.add(progressBar);
    win.add(statusLabel);
    
    // Start summarization
    GenAI.summarize({
        text: articleText,
        outputType: GenAI.THREE_BULLETS,
        inputType: GenAI.ARTICLE,
        streaming: true
    });
    
    return win;
}
```

---

### Image Gallery with Auto Alt-Text

```javascript
function createAccessibleGallery(photos) {

    var win = Ti.UI.createWindow({ backgroundColor: '#000000' });
    
    var scrollView = Ti.UI.createScrollView({
        showVerticalScrollIndicator: true
    });
    win.add(scrollView);
    
    var currentY = 0;
    
    photos.forEach(function(photo, index) {
    
        var container = Ti.UI.createView({
            top: currentY,
            left: 0,
            width: Ti.UI.FILL,
            height: 400,
            backgroundColor: '#1A1A1A'
        });
        scrollView.add(container);
        
        var imageView = Ti.UI.createImageView({
            image: photo.url,
            top: 0,
            width: Ti.UI.FILL,
            height: 350,
            contentMode: Ti.UI.CONTENT_MODE_ASPECT_FIT
        });
        container.add(imageView);
        
        var altText = Ti.UI.createLabel({
            bottom: 0,
            left: 10,
            right: 10,
            height: 50,
            text: 'Generating description...',
            color: '#FFFFFF',
            font: { fontSize: 12 },
            textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER
        });
        container.add(altText);
        
        // Generate alt text
        (function(img, label, photoUrl) {
            var blob = img.toBlob();
            
            GenAI.addEventListener('success', function(e) {
                if (e.operation === 'imageDescription') {
                    label.text = e.text;
                }
            });
            
            GenAI.describeImage({
                image: blob,
                streaming: false
            });
        })(imageView, altText, photo.url);
        
        currentY += 410;
    });
    
    return win;
}
```

---

## Best Practices

### 1. Always Handle Model Downloads

Models may need to download on first use (10-50 MB). Show progress to users:

```javascript
var isDownloading = false;

GenAI.addEventListener('downloadProgress', function(e) {
    if (e.phase === 'started') {
        isDownloading = true;
        showProgressDialog('Downloading AI model...');
    } else if (e.phase === 'completed') {
        isDownloading = false;
        hideProgressDialog();
    }
});
```

### 2. Check Device Compatibility

Not all devices support on-device AI. Handle gracefully:

```javascript
GenAI.addEventListener('error', function(e) {
    if (e.error.includes('unavailable')) {
        // Hide AI features or show alternative
        aiButton.visible = false;
        showCloudBackupOption();
    }
});
```

### 3. Respect Inference Quotas

AICore limits requests per app. Handle quota errors:

```javascript
GenAI.addEventListener('error', function(e) {
    if (e.error.includes('quota')) {
        alert('Please wait a moment before trying again');
        retryAfterDelay(60000); // Wait 1 minute
    }
});
```

### 4. Use Streaming for Long Text

Better UX for summaries and long rewrites:

```javascript
// Good - User sees progress
GenAI.summarize({
    text: longArticle,
    streaming: true  // Show text as it generates
});

// Okay - For short operations
GenAI.rewrite({
    text: shortMessage,
    streaming: false  // Get complete result
});
```

### 5. Clean Up Resources

Always cleanup when done:

```javascript
// Window close
win.addEventListener('close', function() {
    GenAI.cleanup();
});

// Tab change
tabGroup.addEventListener('focus', function(e) {
    if (e.previousIndex === aiTabIndex) {
        GenAI.cleanup();
    }
});

// App background
Ti.App.addEventListener('pause', function() {
    GenAI.cleanup();
});
```

### 6. Choose Right Language

API support varies by language. Fallback to English if needed:

```javascript
function getSupportedLanguage(userLang, operation) {
    var supported = {
        'proofreading': [LANG_ENGLISH, LANG_JAPANESE, LANG_KOREAN, ...],
        'summarization': [LANG_ENGLISH, LANG_JAPANESE, LANG_KOREAN]
    };
    
    return supported[operation].includes(userLang) 
        ? userLang 
        : GenAI.LANG_ENGLISH;
}
```

### 7. Optimize Text Input

Keep text within recommended limits:

```javascript
function optimizeForSummary(text) {
    // Summarization works best with 3000 words or less
    var words = text.split(/\s+/);
    if (words.length > 3000) {
        // Use first few paragraphs
        var paragraphs = text.split('\n\n');
        text = paragraphs.slice(0, 5).join('\n\n');
    }
    return text;
}
```

---

## Advanced Usage

### Custom Event Handlers

Create reusable event handler managers:

```javascript
function createGenAIManager() {
    var handlers = {
        proofreading: [],
        rewriting: [],
        summarization: [],
        imageDescription: []
    };
    
    GenAI.addEventListener('success', function(e) {
        handlers[e.operation].forEach(function(fn) {
            fn(e.text, null);
        });
    });
    
    GenAI.addEventListener('error', function(e) {
        handlers[e.operation].forEach(function(fn) {
            fn(null, e.error);
        });
    });
    
    return {
        proofread: function(text, callback) {
            handlers.proofreading.push(callback);
            GenAI.proofread({ text: text, streaming: false });
        },
        // ... other methods
    };
}

// Usage
var aiManager = createGenAIManager();
aiManager.proofread('Text here', function(result, error) {
    if (error) {
        console.error(error);
    } else {
        console.log(result);
    }
});
```

---

### Batch Processing

Process multiple items efficiently:

```javascript
function batchDescribeImages(images, onComplete) {
    var results = [];
    var currentIndex = 0;
    
    function processNext() {
        if (currentIndex >= images.length) {
            onComplete(results);
            return;
        }
        
        var img = images[currentIndex];
        
        GenAI.addEventListener('success', function handler(e) {
            if (e.operation === 'imageDescription') {
                GenAI.removeEventListener('success', handler);
                results.push({
                    image: img,
                    description: e.text
                });
                currentIndex++;
                setTimeout(processNext, 1000); // Throttle requests
            }
        });
        
        GenAI.describeImage({ image: img.toBlob(), streaming: false });
    }
    
    processNext();
}
```

---

### Language Detection & Auto-Routing

Automatically select best language:

```javascript
function smartProofread(text) {
    // Simple language detection (you'd use a real library)
    var lang = detectLanguage(text);
    
    var langMap = {
        'en': GenAI.LANG_ENGLISH,
        'ja': GenAI.LANG_JAPANESE,
        'ko': GenAI.LANG_KOREAN,
        'de': GenAI.LANG_GERMAN,
        'fr': GenAI.LANG_FRENCH,
        'it': GenAI.LANG_ITALIAN,
        'es': GenAI.LANG_SPANISH
    };
    
    GenAI.proofread({
        text: text,
        language: langMap[lang] || GenAI.LANG_ENGLISH,
        streaming: true
    });
}
```

---

### Caching & Optimization

Cache model availability checks:

```javascript
var modelStatus = {
    proofreading: null,
    rewriting: null,
    summarization: null,
    imageDescription: null,
    lastCheck: 0
};

GenAI.addEventListener('statusChange', function(e) {
    modelStatus[e.operation] = e.status;
    modelStatus.lastCheck = Date.now();
});

function isFeatureReady(feature) {
    return modelStatus[feature] === GenAI.STATUS_AVAILABLE;
}

function shouldCheckStatus() {
    // Recheck every 5 minutes
    return (Date.now() - modelStatus.lastCheck) > 300000;
}
```

---

## FAQ

**Q: Does this work offline?**  
A: Yes! All processing happens on-device. After model download, no internet needed.

**Q: What's the model download size?**  
A: Varies by feature, typically 10-50 MB per model. Downloads happen automatically on first use.

**Q: Are there usage limits?**  
A: AICore enforces quotas per app. Space requests ~1 second apart to avoid quota errors.

**Q: Can I use this in production?**  
A: Yes! Based on Google's production-ready ML Kit. Test thoroughly on target devices first.

**Q: Does it work on emulators?**  
A: No. Requires real Android device with AICore/Gemini Nano support.

**Q: How accurate is it?**  
A: Uses same Gemini Nano model as Android system features. Quality is production-ready but review outputs before showing to users.

**Q: Can I fine-tune the models?**  
A: No. Models are pre-trained by Google and can't be customized.

**Q: What's the performance impact?**  
A: Runs efficiently on-device. Inference takes 1-3 seconds typically. Battery optimized by AICore.


---

## Changelog

### v2.0.0
- ✅ Proofreading API
- ✅ Rewriting API (6 styles)
- ✅ Summarization API (1-3 bullets)
- ✅ Image Description API
- ✅ Multi-language support
- ✅ Streaming & non-streaming modes
- ✅ Complete event system
- ✅ Automatic model download management

---

## Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request
