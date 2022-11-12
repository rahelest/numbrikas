<div class="main__wrapper">
  <h4>Introduction</h4>
  <p>
    Clear the board by finding pairs. Copy all the remaining cells to find new pairs by clicking
    expand.
  </p>
  <h5>Pair is two equal numbers</h5>
  <div class="main__table">
    <button>5</button>
    <button class="selected">1</button>
    <button class="selected">1</button>
    <button>2</button>
    <button class="selected">3</button>
    <button class="selected">3</button>
    <button>1</button>
    <button class="selected">5</button>
    <button class="selected">5</button>
  </div>

  <h5>or numbers that sum to 10</h5>
  <div class="main__table">
    <button />
    <button class="selected">1</button>
    <button />
    <button class="selected">2</button>
    <button />
    <button class="selected">3</button>
    <button />
    <button class="selected">4</button>
    <button />
    <button />
    <button class="selected">9</button>
    <button />
    <button class="selected">8</button>
    <button />
    <button class="selected">7</button>
    <button />
    <button class="selected">6</button>
    <button />
  </div>

  <h5>Pairs have to be adjacent</h5>
  <div class="main__table">
    <button class="selected">9</button>
    <button class="selected">1</button>
    <button />
    <button class="selected">2</button>
    <button />
    <button />
    <button />
    <button />
    <button />
    <button />
    <button />
    <button />
    <button class="selected">2</button>
    <button />
    <button />
    <button />
    <button />
    <button />
  </div>

  <h5>Blank cells don't count</h5>
  <div class="main__table">
    <button />
    <button class="selected">4</button>
    <button />
    <button />
    <button />
    <button class="selected">1</button>
    <button />
    <button class="selected">1</button>
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
    <button class="selected">4</button>
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
    <button>2</button>
    <button />
    <button />
    <button>3</button>
    <button class="selected">1</button>
    <button />
    <button class="selected">1</button>
    <button />
    <button>4</button>
    <button />
    <button />
    <button>5</button>
    <button />
    <button />
    <button />
  </div>

  <h5 id="expand">Out or pairs? "Expand" copies everything and you can find new combinations. Before:</h5>
  <div class="main__table">
    <button>3</button>
    <button>4</button>
    <button />
    <button />
    <button />
    <button>3</button>
    <button />
    <button>6</button>
    <button>7</button>
    <button>1</button>
    <button />
    <button />
    <button>3</button>
    <button>4</button>
    <button />
    <button />
    <button />
    <button />
  </div>
  <h5>After:</h5>
  <div class="main__table">
    <button>3</button>
    <button>4</button>
    <button />
    <button />
    <button />
    <button>3</button>
    <button />
    <button>6</button>
    <button>7</button>
    <button>1</button>
    <button />
    <button />
    <button>3</button>
    <button>4</button>
    <button class="highlighted">3</button>
    <button class="highlighted">4</button>
    <button class="highlighted">3</button>
    <button class="highlighted">6</button>
    <button class="highlighted">7</button>
    <button class="highlighted">1</button>
    <button class="highlighted">3</button>
    <button class="highlighted">4</button>
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
