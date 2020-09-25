/*
 *
 *
 *       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
 *       -----[Keep the tests in the same order!]----
 *       (if additional are added, keep them at the very end!)
 */

const chai = require('chai');
const assert = chai.assert;

const { JSDOM } = require('jsdom');
let Translator;

suite('Functional Tests', () => {
  suiteSetup(() => {
    // Mock the DOM for testing and load Translator
    return JSDOM.fromFile('./views/index.html')
      .then((dom) => {
        global.window = dom.window;
        global.document = dom.window.document;

        Translator = require('../public/translator.js').Translator;
      });
  });

  suite('Function translateButtonClickHandler()', () => {
    /* 
      The translated sentence is appended to the `translated-sentence` `div`
      and the translated words or terms are wrapped in 
      `<span class="highlight">...</span>` tags when the "Translate" button is pressed.
    */
    test("Translation appended to the `translated-sentence` `div`", done => {
      const input = 'Mangoes are my favorite fruit.';
      const output = 'Mangoes are my <span class="highlight">favourite</span> fruit.';
      document.getElementById('text-input').value = input;
      Translator.translateButtonClickHanlder();
      assert.equal(document.getElementById('translated-sentence').innerHTML,
        output);
      done();
    });

    /* 
      If there are no words or terms that need to be translated,
      the message 'Everything looks good to me!' is appended to the
      `translated-sentence` `div` when the "Translate" button is pressed.
    */
    test("'Everything looks good to me!' message appended to the `translated-sentence` `div`", done => {

      document.getElementById('text-input').value = "No translation needed!";
      Translator.translateButtonClickHanlder();
      assert.equal(document.getElementById('translated-sentence').innerHTML,
        'Everything looks good to me!');
      done();
    });

    /* 
      If the text area is empty when the "Translation" button is
      pressed, append the message 'Error: No text to translate.' to 
      the `error-msg` `div`.
    */
    test("'Error: No text to translate.' message appended to the `translated-sentence` `div`", done => {
      document.getElementById('text-input').value = "";
      Translator.translateButtonClickHanlder();
      assert.equal(document.getElementById('error-msg').innerHTML,
        'Error: No text to translate.');
      done();
    });

  });

  suite('Function clearButtonClickHandler()', () => {
    /* 
      The text area and both the `translated-sentence` and `error-msg`
      `divs` are cleared when the "Clear" button is pressed.
    */
    test("Text area, `translated-sentence`, and `error-msg` are cleared", done => {
      document.getElementById('translated-sentence').innerHTML = "Clear Me!";
      document.getElementById('error-msg').innerHTML = "Clear me!";
      Translator.clearButtonClickHandler();
      assert.isEmpty(document.getElementById('translated-sentence').innerHTML);
      assert.isEmpty(document.getElementById('error-msg').innerHTML);
      done();
    });

  });

});
