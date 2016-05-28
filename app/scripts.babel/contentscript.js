/* global $ */
console.log('\'Allo \'Allo! Content script')


const VueDragula = require('vue-dragula')

Vue.use(VueDragula);

$.get(chrome.extension.getURL('/inject.html'), data => {
  $(data).appendTo('body')
  // Or if you're using jQuery 1.8+:
  // $($.parseHTML(data)).appendTo('body');
  // console.log(data)
  new Vue({
    el: '#mb-vue',
    data: {
      recipient: '',
      subject: '',
      questions: [
        { text: 'How productive was the meeting?', selected: false },
        { text: 'The meeting objectives were met', selected: false },
        { text: 'The meeting was the appropriate length of time', selected: false },
        { text: 'The speakers were easily heard', selected: false },
        { text: 'The presentation was easily seen', selected: false },
        { text: 'The right people were invited to the meeting', selected: false },
        { text: 'The meeting leader(s) effectively moderated the meeting', selected: false },
        { text: 'The meeting objectives were clearly communicated in advance of the meeting', selected: false },
      ],
      selectedQuestions: [
      ],
    },
    methods: {
      // addTodo() {
      //   const text = this.newTodo.trim()
      //   if (text) {
      //     this.todos.push({ text })
      //     this.newTodo = ''
      //   }
      // },
      toggleSelect(index) {
        const idx = this.selectedQuestions.indexOf(index)
        if (idx < 0) {
          this.selectedQuestions.push(index)
          this.questions[index].selected = true
        } else {
          this.selectedQuestions.splice(idx, 1)
          this.questions[index].selected = false
        }
      },
      // removeTodo(index) {
      //   this.todos.splice(index, 1)
      // },
    },
    // created() {
    //   Vue.vueDragula.options('questionsBag', {
    //     direction: 'vertical'
    //   })
    // },
  })
})


function onAddSurveyClick() {
  $('.mb-modal').fadeIn(300)
  $('.mb-cover').fadeTo(300, 0.5).css('display', 'block')
  $('.mb-close-modal').click(() => {
    $('.mb-modal').fadeOut(300)
    $('.mb-cover').fadeOut(300)
  })
}

// a DOM-listener from: http://stackoverflow.com/questions/2844565
MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

const observer = new MutationObserver(() => {
  // fired when a mutation occurs
  const $neb = $('.neb-actions-right')
  if ($neb && !$neb.find('.mb-addsurveybtn').length) {
    const $newButton = $(`
      <div
        role="button"
        class="mb-addsurveybtn goog-inline-block jfk-button"
        tabindex="0"
        style="
          background: #a24fe3;
          -webkit-user-select: none;
          color: #fff;
          border: 1px solid #922fc3;
          box-shadow: none;
        "
      >
        Add Survey
      </div>
    `)
    $newButton.click(onAddSurveyClick)
    $neb.prepend($newButton)
  }
})

// define what element should be observed by the observer
// and what types of mutations trigger the callback
observer.observe(document.body, {
  childList: true,
})
