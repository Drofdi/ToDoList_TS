var SelectorsToDo = /** @class */ (function () {
    function SelectorsToDo(selectors) {
        this.butInp = selectorsList.butInp;
        this.inpMain = selectorsList.inpMain;
        this.inpDate = selectorsList.inpDate;
        this.list = selectorsList.list;
        this.wrapDiv = selectorsList.wrapDiv;
        this.butTheme = selectorsList.butTheme;
        this.butInp = selectorsList.butInp;
        this.inpMain = selectorsList.inpMain;
        this.inpDate = selectorsList.inpDate;
        this.list = selectorsList.list;
        this.wrapDiv = selectorsList.wrapDiv;
        this.butTheme = selectorsList.butTheme;
    }
    return SelectorsToDo;
}());
var ServiceToDo = /** @class */ (function () {
    function ServiceToDo(selectors, dateMain) {
        this.selectors = selectors;
        this.dateMain = dateMain;
        this.themeButton = this.themeButton.bind(this);
        this.clearInpMain = this.clearInpMain.bind(this);
        this.clearInpDate = this.clearInpDate.bind(this);
        this.createNewElem = this.createNewElem.bind(this);
        this.setEvents = this.setEvents.bind(this);
        this.setEvents();
    }
    ServiceToDo.prototype.setEvents = function () {
        this.selectors.butTheme.addEventListener('click', this.themeButton);
        this.selectors.inpMain.addEventListener('focus', this.clearInpMain);
        this.selectors.inpDate.addEventListener('focus', this.clearInpDate);
        this.selectors.butInp.addEventListener('click', this.createNewElem);
    };
    ServiceToDo.prototype.themeButton = function () {
        this.selectors.wrapDiv.classList.toggle('darkTheme');
        this.selectors.list.classList.toggle('list_parentDark');
        this.selectors.butInp.classList.toggle('input__buttonDark');
    };
    ServiceToDo.prototype.clearInpMain = function () {
        this.selectors.inpMain.value = '';
    };
    ServiceToDo.prototype.clearInpDate = function () {
        this.selectors.inpDate.value = '';
    };
    ServiceToDo.prototype.createNewElem = function () {
        var divTaskContainer = document.createElement('div');
        divTaskContainer.classList.add('list_container');
        this.selectors.list.appendChild(divTaskContainer);
        if (this.selectors.inpMain.value === 'Введите задачу') {
            this.selectors.inpMain.value = '';
        }
        if (this.selectors.inpDate.value === 'Дата в формате 31.12') {
            this.selectors.inpDate.value = '';
        }
        var newTask = document.createElement('div');
        if (this.selectors.inpMain.value.length == 0) {
            alert('Пожалуйста, введите корректую задачу, поле не может быть пустым (:');
            return 'error';
        }
        else if (this.selectors.inpDate.value.length == 0) {
            this.selectors.inpDate.value = '';
            newTask.innerHTML = this.selectors.inpMain.value;
            divTaskContainer.appendChild(newTask);
        }
        else {
            newTask.innerHTML = "(DeadLine: ".concat(this.selectors.inpDate.value, ") ").concat(this.selectors.inpMain.value);
            divTaskContainer.appendChild(newTask);
        }
        if (this.dateMain.check == this.selectors.inpDate.value) {
            alert("\u0421\u0435\u0433\u043E\u0434\u043D\u044F \u043A\u0440\u0430\u0439\u043D\u0438\u043A \u0441\u0440\u043E\u043A \u0437\u0430\u0434\u0430\u0447\u0438 \"".concat(this.selectors.inpMain.value, "\""));
        }
        this.selectors.inpMain.value = '';
        this.selectors.inpDate.value = '';
        var butChildListDone = document.createElement('button');
        butChildListDone.innerHTML = '<img src="img/titleImg.png">';
        butChildListDone.classList.add('butDone');
        divTaskContainer.appendChild(butChildListDone);
        butChildListDone.addEventListener('click', function () {
            newTask.classList.add('butDoneAfterClick');
        });
        var butChildListDelete = document.createElement('button');
        butChildListDelete.innerHTML = '<img src="img/cross.png">';
        butChildListDelete.classList.add('butDelete');
        divTaskContainer.appendChild(butChildListDelete);
        butChildListDelete.addEventListener('click', function () {
            if (divTaskContainer.parentNode) {
                divTaskContainer.parentNode.removeChild(divTaskContainer);
                console.log(divTaskContainer.parentNode);
            }
        });
    };
    return ServiceToDo;
}());
var DateTodo = /** @class */ (function () {
    function DateTodo(nowDate) {
        this.zeroBeforeDay = this.zeroBeforeDay.bind(this);
        this.zeroBeforeMonth = this.zeroBeforeMonth.bind(this);
        this.nowDate = nowDate;
        this.check = "".concat(this.zeroBeforeDay(this.nowDate.getDate()), ".").concat(this.zeroBeforeMonth(this.nowDate.getMonth() + 1));
    }
    DateTodo.prototype.zeroBeforeMonth = function (month) {
        if (month >= 0 && month <= 9) {
            return '0' + month;
        }
        else {
            return month;
        }
    };
    DateTodo.prototype.zeroBeforeDay = function (day) {
        if (day >= 0 && day <= 9) {
            return '0' + day;
        }
        else {
            return day;
        }
    };
    return DateTodo;
}());
var selectorsList = {
    butInp: document.querySelector('.input__button'),
    inpMain: document.querySelector('.input__inp'),
    inpDate: document.querySelector('.input__date'),
    list: document.querySelector('.list_parent'),
    wrapDiv: document.querySelector('.wrapper'),
    butTheme: document.querySelector('.butDarkLigth'),
};
var nowDate = new Date();
var selectors = new SelectorsToDo(selectorsList);
var dateMain = new DateTodo(nowDate);
var mainToDo = new ServiceToDo(selectors, dateMain);
