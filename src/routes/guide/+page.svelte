<div class="main__wrapper">
  <h4>Introduction</h4>
  <p>
    Clear the board by finding pairs. Copy all the remaining cells to find new pairs by clicking
    expand.
  </p>
  <h5>Pair is two equal numbers</h5>
  <div class="main__table">
    <button class="five">5</button>
    <button class="selected one">1</button>
    <button class="selected one">1</button>
    <button class="two">2</button>
    <button class="selected three">3</button>
    <button class="selected three">3</button>
    <button class="one">1</button>
    <button class="selected five">5</button>
    <button class="selected five">5</button>
  </div>

  <h5>or numbers that sum to 10</h5>
  <div class="main__table">
    <button />
    <button class="selected one">1</button>
    <button />
    <button class="selected two">2</button>
    <button />
    <button class="selected three">3</button>
    <button />
    <button class="selected four">4</button>
    <button />
    <button />
    <button class="selected one">9</button>
    <button />
    <button class="selected two">8</button>
    <button />
    <button class="selected three">7</button>
    <button />
    <button class="selected four">6</button>
    <button />
  </div>

  <h5>Pairs have to be adjacent</h5>
  <div class="main__table">
    <button class="selected one">9</button>
    <button class="selected one">1</button>
    <button />
    <button class="selected two">2</button>
    <button />
    <button />
    <button />
    <button />
    <button />
    <button />
    <button />
    <button />
    <button class="selected two">2</button>
    <button />
    <button />
    <button />
    <button />
    <button />
  </div>

  <h5>Blank cells don't count</h5>
  <div class="main__table">
    <button />
    <button class="selected four">4</button>
    <button />
    <button />
    <button />
    <button class="selected one">1</button>
    <button />
    <button class="selected one">1</button>
    <button />
    <button />
    <button />
    <button />
    <button />
    <button />
    <button />
    <button />
    <button />
    <button />
    <button />
    <button class="selected four">4</button>
    <button />
    <button />
    <button />
    <button />
    <button />
    <button />
    <button />
  </div>

  <h5>Line breaks don't count either</h5>
  <div class="main__table">
    <button />
    <button />
    <button />
    <button class="two">2</button>
    <button />
    <button />
    <button class="three">3</button>
    <button class="selected one">1</button>
    <button />
    <button class="selected one">1</button>
    <button />
    <button class="four">4</button>
    <button />
    <button />
    <button class="five">5</button>
    <button />
    <button />
    <button />
  </div>

  <h5 id="expand">
    Out or pairs? "Expand" copies everything and you can find new combinations. Before:
  </h5>
  <div class="main__table">
    <button class="three">3</button>
    <button class="four">4</button>
    <button />
    <button />
    <button />
    <button class="three">3</button>
    <button />
    <button class="four">6</button>
    <button class="three">7</button>
    <button class="one">1</button>
    <button />
    <button />
    <button class="three">3</button>
    <button class="four">4</button>
    <button />
    <button />
    <button />
    <button />
  </div>
  <h5>After:</h5>
  <div class="main__table">
    <button class="three">3</button>
    <button class="four">4</button>
    <button />
    <button />
    <button />
    <button class="three">3</button>
    <button />
    <button class="four">6</button>
    <button class="three">7</button>
    <button class="one">1</button>
    <button />
    <button />
    <button class="three">3</button>
    <button class="four">4</button>
    <button class="highlighted three">3</button>
    <button class="highlighted four">4</button>
    <button class="highlighted three">3</button>
    <button class="highlighted four">6</button>
    <button class="highlighted three">7</button>
    <button class="highlighted one">1</button>
    <button class="highlighted three">3</button>
    <button class="highlighted four">4</button>
    <button />
    <button />
    <button />
    <button />
    <button />
  </div>
</div>

<style>
  h5 {
    margin-top: 2em;
  }

  .highlighted {
    font-weight: bold;
  }
</style>
