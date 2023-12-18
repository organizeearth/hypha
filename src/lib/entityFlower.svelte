<script>
  import { myPerfectColor, myPerfectGradient } from "$lib/colors.js";
  import "@fontsource/delicious-handrawn";
  export let questions;
  export let activeQuestionId = 0;
 

  const qs = questions
    .map((item, index) => {
      return {
        ...item,
        color: myPerfectColor(index / questions.length, 0.1),
        gradient: myPerfectGradient(index / questions.length),
      };
    })
    .sort((a, b) => {
      return a.order > b.order;
    });

  const defaultQuestion = { q: "", a: "", color: "#888" };
  $: activeQuestion = qs.find((q) => q.order === activeQuestionId)
    ? qs.find((q) => q.order === activeQuestionId)
    : defaultQuestion;

  //$: console.log({ activeQuestion });

  function setActiveQuestion(index) {
    if (activeQuestionId == index) {
      activeQuestionId = -1;
      activeQuestion = activeQuestion;
      return;
    }
    activeQuestionId = index;
    activeQuestion = activeQuestion;
    //console.log({ qs, activeQuestionId, activeQuestion });
  }
</script>

<div class="entity-flower-wrapper">
  {#each qs as question, index}
    <button
      role="radio"
      aria-checked={index === activeQuestionId}
      class="petal"
      on:click={() => setActiveQuestion(index)}
      style:border-color={question.color}
      style:background={index === activeQuestionId
        ? question.color
        : "transparent"}
    >
      <h3 style:color={index === activeQuestionId ? "white" : question.color}>
        {question.q}
      </h3>
    </button>
  {/each}
  <div class="petal" style:border-color={activeQuestion.color}>
    <div class="quote-wrapper">
      <blockquote
        class="text q-{activeQuestion.order}"
        cite=""
        style:background={activeQuestion.gradient}
      >
        <p>{@html activeQuestion.a}</p>
        <!--<footer>– Jesse James Garrett</footer>-->
      </blockquote>
    </div>
  </div>
</div>

<style>
  .quote-wrapper {
    /* height: 300px; */
    /* position: relative; */
    /* width: 300px; */
    margin: 0px auto;
  }
  .text {
    background: radial-gradient(
      ellipse at center,
      rgba(128, 128, 128, 0.5) 0%,
      rgba(128, 128, 128, 0) 70.3%
    );
    height: 100%;
    width: 100%;
  }
  .text.q-0 {
    background: radial-gradient(
      ellipse at center,
      rgba(242, 119, 122, 0.5) 0%,
      rgba(138, 68, 70, 0) 70.3%
    );
  }
  .text.q-1 {
    background: radial-gradient(
      ellipse at center,
      rgba(207, 146, 10, 0.5) 0%,
      rgba(118, 83, 6, 0) 70.3%
    );
  }
  .text.q-2 {
    background: radial-gradient(
      ellipse at center,
      rgba(137, 170, 31, 0.5) 0%,
      rgba(77, 96, 17, 0) 70.3%
    );
  }
  .text.q-3 {
    background: radial-gradient(
      ellipse at center,
      rgba(103, 176, 167, 0.5) 0%,
      rgba(56, 96, 91, 0) 70.3%
    );
  }
  .text.q-4 {
    background: radial-gradient(
      ellipse at center,
      rgba(128, 157, 255, 0.5) 0%,
      rgba(71, 87, 141, 0) 70.3%
    );
  }
  .text.q-5 {
    background: radial-gradient(
      ellipse at center,
      rgba(206, 130, 202, 0.5) 0%,
      rgba(118, 74, 115, 0) 70.3%
    );
  }
  .text {
    color: black;
    position: relative;
    margin: 0;
    text-align: center;
  }
  .text p {
    height: 100%;
    font-size: 0.8em;
    line-height: 1.25;
    padding: 0;
    text-align: center;
    text-shadow: 0.5px 0.5px 1px rgba(255, 255, 255, 0.5);
  }
  .text::before {
    content: "";
    float: left;
    height: 100%;
    width: 50%;
    shape-outside: polygon(
      0 0,
      98% 0,
      50% 6%,
      23.4% 17.3%,
      6% 32.6%,
      0 50%,
      6% 65.6%,
      23.4% 82.7%,
      50% 94%,
      98% 100%,
      0 100%
    );
    shape-margin: 7%;
  }
  .text p::before {
    content: "";
    float: right;
    height: 100%;
    width: 50%;
    shape-outside: polygon(
      2% 0%,
      100% 0%,
      100% 100%,
      2% 100%,
      50% 94%,
      76.6% 82.7%,
      94% 65.6%,
      100% 50%,
      94% 32.6%,
      76.6% 17.3%,
      50% 6%
    );
    shape-margin: 7%;
  }
  @media (min-width: 850px) {
    .quote-wrapper {
      height: 370px;
      width: 370px;
    }
    .quote-wrapper::before {
      font-size: 300px;
    }
    .text p {
      font-size: 17px;
    }
  }
  .entity-flower-wrapper {
    display: grid;
    grid: repeat(5, 1fr) / repeat(5, 1fr);
    gap: 1px;
    flex-grow: fill;
    margin: 3em auto;
    font-weight: bold;
  }
  .petal {
    border: 1px solid black;
    text-align: center;
    border-radius: 50%;
    background: transparent;
    /* margin: 0px auto; */
  }
  .petal:hover {
    background: white;
  }
  .petal:last-child {
    background: transparent !important;
  }
  .petal h3 {
    margin: 1em 0;
    font-size: 2em;
  }
  /* why */
  .petal:nth-child(1) {
    grid-column: 2;
    grid-row: 1;
    margin-bottom: -2.25em;
    margin-top: 3em;
  }
  /* who */
  .petal:nth-child(2) {
    grid-column: 4;
    grid-row: 1;
    margin-bottom: -2.25em;
    margin-top: 3em;
  }
  /* how */
  .petal:nth-child(6) {
    grid-column: 1;
    grid-row: 3;
    margin-top: 0.25em;
    margin-bottom: 0.25em;
  }
  /* what */
  .petal:nth-child(3) {
    grid-column: 5;
    grid-row: 3;
    margin-top: 0.25em;
    margin-bottom: 0.25em;
  }
  /* when */
  .petal:nth-child(5) {
    grid-column: 2;
    grid-row: 5;
    margin-bottom: 3em;
    margin-top: -2.25em;
  }
  /* where */
  .petal:nth-child(4) {
    grid-column: 4;
    grid-row: 5;
    margin-bottom: 3em;
    margin-top: -2.25em;
  }

  .petal {
    text-transform: uppercase;
    font-family: "Delicious Handrawn", cursive;
  }
  /* center */
  .petal:nth-child(7) {
    grid-column: 2 / span 3;
    grid-row: 2 / span 3;
    border: 1px solid red;
    text-transform: none;
    font-family: Arial, Helvetica, sans-serif;
  }

  h3 {
    font-weight: bold;
    margin: 0;
  }
  .entity-flower-wrapper {
    border-radius: 5px;
    padding: 5px;
    max-width: 700px;
  }
</style>
