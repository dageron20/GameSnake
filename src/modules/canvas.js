export default class Canvas {
    constructor(container)  { // контейнер куда вставляем канвас 
        this.element = document.createElement('canvas');
        this.context = this.element.getContext('2d');

        this.element.width = 320;
        this.element.height = 400;

        container.appendChild(this.element); // размещаем на стр
        
    }
}