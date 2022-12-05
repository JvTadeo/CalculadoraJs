class CalcController
{
    constructor()
    {
        this._displayCalc = "0";
        this._currentDate;
        this.initialize();
    }

    initialize()
    {
        let displayCalcEl = document.querySelector("#display");
        let dataEl = document.querySelector("#data");
        let timeEl = document.querySelector("#hora");   

        displayCalcEl.innerHTML = "4568";
        dataEl.innerHTML = "05/12/2022";
        timeEl.innerHTML = "00:48";
    }

    get displayCalc()
    {
        return this._displayCalc;
    }

    set displayCalc(valor)
    {
        this._displayCalc = valor;
    }

    get dataAtual()
    {
        return this._currentDate;
    }
    
    set dataAtual(valor)
    {
        this._currentDate = valor;
    }
}