interface SelectorsList {
  butInp: HTMLButtonElement;
  inpMain: HTMLInputElement;
  inpDate: HTMLInputElement;
  list: HTMLDivElement;
  wrapDiv: HTMLDivElement;
  butTheme: HTMLButtonElement;
}


class SelectorsToDo{
      butInp = selectorsList.butInp
      inpMain = selectorsList.inpMain
      inpDate = selectorsList.inpDate
      list = selectorsList.list
      wrapDiv = selectorsList.wrapDiv
      butTheme = selectorsList.butTheme
  constructor(selectors: SelectorsList){
        this.butInp = selectorsList.butInp
        this.inpMain = selectorsList.inpMain
        this.inpDate = selectorsList.inpDate
        this.list = selectorsList.list
        this.wrapDiv = selectorsList.wrapDiv
        this.butTheme = selectorsList.butTheme
  }
}

class ServiceToDo{
      selectors: SelectorsToDo
      dateMain: DateTodo
  constructor(selectors: SelectorsToDo, dateMain: DateTodo) {
      this.selectors = selectors
      this.dateMain = dateMain
      this.themeButton = this.themeButton.bind(this)
      this.clearInpMain = this.clearInpMain.bind(this)
      this.clearInpDate = this.clearInpDate.bind(this)
      this.createNewElem = this.createNewElem.bind(this)
      this.setEvents = this.setEvents.bind(this)

      this.setEvents()
  }

  setEvents(){
      this.selectors.butTheme.addEventListener('click', this.themeButton)
      this.selectors.inpMain.addEventListener('focus',this.clearInpMain)
      this.selectors.inpDate.addEventListener('focus',this.clearInpDate)
      this.selectors.butInp.addEventListener('click', this.createNewElem)
  }

  themeButton(){
      this.selectors.wrapDiv.classList.toggle('darkTheme')
      this.selectors.list.classList.toggle('list_parentDark')
      this.selectors.butInp.classList.toggle('input__buttonDark')
  }

  clearInpMain(){
      this.selectors.inpMain.value = ''
  }

  clearInpDate(){
      this.selectors.inpDate.value = ''
  }

  createNewElem(){
      let divTaskContainer = document.createElement('div')
      divTaskContainer.classList.add('list_container')
      this.selectors.list.appendChild(divTaskContainer)
  
      if (this.selectors.inpMain.value ==='Введите задачу'){
          this.selectors.inpMain.value = ''
      }
      if (this.selectors.inpDate.value ==='Дата в формате 31.12'){
          this.selectors.inpDate.value = ''
      }
  
      let newTask = document.createElement('div')
          if (this.selectors.inpMain.value.length == 0){
              alert('Пожалуйста, введите корректую задачу, поле не может быть пустым (:')
              return 'error'
          }else if (this.selectors.inpDate.value.length == 0){
              this.selectors.inpDate.value = ''
              newTask.innerHTML = this.selectors.inpMain.value 
              divTaskContainer.appendChild(newTask)
          } else {
              newTask.innerHTML = `(DeadLine: ${this.selectors.inpDate.value}) ${this.selectors.inpMain.value}`
              divTaskContainer.appendChild(newTask)
          }
  
  
      if(this.dateMain.check == this.selectors.inpDate.value) {
          alert(`Сегодня крайник срок задачи "${this.selectors.inpMain.value}"`)
      }
  
      this.selectors.inpMain.value = ''
      this.selectors.inpDate.value = ''
  
      let butChildListDone = document.createElement('button')
      butChildListDone.innerHTML = '<img src="img/titleImg.png">'
      butChildListDone.classList.add('butDone')
      divTaskContainer.appendChild(butChildListDone)
  
      butChildListDone.addEventListener('click', function(){
          newTask.classList.add('butDoneAfterClick')
      })
  
      let butChildListDelete = document.createElement('button')
      butChildListDelete.innerHTML = '<img src="img/cross.png">'
      butChildListDelete.classList.add('butDelete')
      divTaskContainer.appendChild(butChildListDelete)
  
      butChildListDelete.addEventListener('click', function(){
          if (divTaskContainer.parentNode){
          divTaskContainer.parentNode.removeChild(divTaskContainer)
          console.log(divTaskContainer.parentNode)
        }
      })
  }
}

class DateTodo{
      nowDate: Date
      check: String
  constructor(nowDate: Date){
      this.zeroBeforeDay = this.zeroBeforeDay.bind(this)
      this.zeroBeforeMonth = this.zeroBeforeMonth.bind(this)
      this.nowDate = nowDate
      this.check = `${this.zeroBeforeDay(this.nowDate.getDate())}.${this.zeroBeforeMonth(this.nowDate.getMonth() + 1)}`
  }
  
  zeroBeforeMonth(month) {
      if (month >= 0 && month <= 9) {
             return '0' + month
         } else {
             return month
         }
  }

  zeroBeforeDay(day){
      if (day >= 0 && day <= 9) {
          return '0' + day
      } else {
          return day
      }
  }
}

let selectorsList: SelectorsList = {
  butInp: document.querySelector('.input__button') as HTMLButtonElement,
  inpMain: document.querySelector('.input__inp') as HTMLInputElement,
  inpDate: document.querySelector('.input__date') as HTMLInputElement,
  list: document.querySelector('.list_parent') as HTMLDivElement,
  wrapDiv: document.querySelector('.wrapper') as HTMLDivElement,
  butTheme: document.querySelector('.butDarkLigth') as HTMLButtonElement,
};

let nowDate = new Date()
let selectors = new SelectorsToDo(selectorsList)
let dateMain = new DateTodo(nowDate)
let mainToDo = new ServiceToDo(selectors, dateMain)