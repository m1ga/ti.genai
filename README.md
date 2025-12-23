# ti.genai - ML Kit GenAI for Titanium SDK (Android)

Titanium SDK module for Googles ML Kit GenAI https://developers.google.com/ml-kit/genai
For an iOS AI module have a look at https://github.com/deckameron/Ti.Apple.Intelligence

## Requirements

* `<uses-sdk android:minSdkVersion="26"/>` in your tiapp.xml

## Methods
* proofread({text})
* rewrite({text, outputType})
* summarize({text, inputType, outputType})

## Events
* streamResult: text (streaming text result)
* status: status (download started, download failed, download complete)

## Rewrite outputType constants

* ELABORATE
* PROFESSIONAL
* SHORTEN
* FRIENDLY
* EMOJIFY
* REPHRASE

## Summarize inputType constants

* ARTICLE
* CONVERSATION

## Summarize outputType constants

* ONE_BULLET
* TWO_BULLETS
* THREE_BULLETS

## Example

Check example/app.js for a full example
