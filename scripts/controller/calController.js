class calController
{
    constructor()
    {
        this._output = document.querySelector(".output")
        this.initialize();
        this.initiButtonEvents();
    }

    initialize()
    {
        this.calculator();
    }

    addEventListenerAll(element, events, fn)
    {
        events.split(' ').forEach(event =>{
            element.addEventListener(event, fn, false);
        } )
    }

    initiButtonEvents()
    {
        let buttons = document.querySelectorAll(".key");

        buttons.forEach((btn, index) => {
            this.addEventListenerAll(btn, "mouseover mouseup mousedown", e => {
                btn.style.cursor = "pointer";
            })
        })
    }

    get output()
    {
        return this._output.innerHTML;
    }

    set output(value)
    {
        this._output.innerHTML = value;
    }

}

