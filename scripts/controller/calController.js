class calController
{
    constructor()
    {
        this._lastOperator = '';
        this._lastNumber = '';
        this._operation = [];

        this._output = document.querySelector(".output")

        this.initialize();
        this.initiButtonEvents();
    }

    initialize()
    {
        this.setLastNumberToOutput();
    }

    addEventListenerAll(element, events, fn)
    {
        events.split(' ').forEach( event => {
            element.addEventListener(event, fn, false);
        })
    }

    clearAll()
    {
        this._operation = [];
        this._lastNumber = '';
        this._lastOperator = '';

        this.setLastNumberToOutput();
    }

    getLastOperation()
    {
        return this._operation[this._operation.length - 1];
    }

    setLastOperation(value)
    {
        return this._operation[this._operation.length - 1] = value;
    }

    isOperation(value)
    {
        return ['+', '-', '*', '/', '%'].indexOf(value) > -1;
    }

    pushOperation(value)
    {
        this._operation.push(value);
        if(this._operation.length > 3)
        {
            let last = this._operation.pop();
            this.calc();
        }
    }

    getResult()
    {
        return eval(this._operation.join(''));
    }

    calc()
    {
        let last = '';
        this._lastOperator = this.getLastItem();
        let result = this.getResult();

        if(this._operation.length < 3)
        {
            let firstItem = this._operation[0];
            this._operation = [firstItem, this._lastOperator, this._lastNumber];
        }

        if(this._operation.length > 3)
        {
            let last = this._operation.pop();
            this._lastNumber = this.getResult();
        }
        else if(this._operation == 3)
        {
            this._lastNumber = this.getLastItem(false);
        }
        else
        {
            this._operation = [result];
            if(last) this._operation.push(last);
        }

        this.setLastNumberToOutput();

    }

    getLastItem(isOperation = true)
    {
        let lastItem;

        for(let i = this._operation.length - 1; i >= 0; i--)
        {
            if(this.isOperation(this._operation[i]) == isOperation)
            {
                lastItem = this._operation[i];
                break;
            }
        }

        if(!lastItem)
        {
            lastItem = (isOperation) ? this._lastOperator : this._lastNumber;
        }

        return lastItem;
    }

    setLastNumberToOutput()
    {
        let lastNumber = this.getLastItem(false);

        if(!lastNumber) lastNumber = 0;

        this.output = lastNumber;
    }

    addOperation(value)
    {
        if(isNaN(this.getLastOperation()))
        {
            if(this.isOperation(value))
            {
                this.setLastOperation(value);
            }
            else
            {
                this.pushOperation(value);
                this.setLastNumberToOutput();
            }
        }
        else
        {
            if(this.isOperation(value))
            {
                this.pushOperation(value);
            }
            else
            {
                let newValue = this.getLastOperation().toString() + value.toString();
                this.setLastOperation(newValue);

                this.setLastNumberToOutput();
            }
        }
    }

    addDot()
    {
        let lastOperation = this.getLastOperation();

        if(typeof lastOperation === 'string' && lastOperation.split('').indexOf('.') > -1) return;

        if(this.isOperation(lastOperation) || !lastOperation)
        {
            this.pushOperation('0.');
        }
        else
        {
            this.setLastOperation(lastOperation.toString() + '.');
        }

        this.setLastNumberToOutput();
    }

    executeBtn(value)
    {
        switch(value)
        {
            case 'key_enter':
                this.calc();
                break;
            case "AC":
                this.clearAll();
                break;
            case "key_operator +":
                this.addOperation('+');
                break;
            case 'key_operator -':
                this.addOperation('-');
                break;
            case 'key_operator x':
                this.addOperation('*');
                break;
            case 'key_operator /':
                this.addOperation('/');
                break;
            case '.':
                this.addDot();
                break;
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(parseInt(value))
                break;
        }
    }

    initiButtonEvents()
    {
        let buttons = document.querySelectorAll(".key");

        buttons.forEach((btn, index) => {

            this.addEventListenerAll(btn, "click drag", e =>{
                
                let textBtn = btn.className.replace("key ", "");
                this.executeBtn(textBtn);
            });

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

