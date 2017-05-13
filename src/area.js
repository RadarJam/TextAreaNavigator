global_form = [
    {"title":"Welcome","text":"Welcome to us here at {{}}, we hope you would enjoy your stay! If you have any questions please contact our {{}}."},
    {"title":"Spanish","text":"Nobody expects the {{}} inquisition! Our cheap weapons are {{}} and {{}}!"},
]

function markPrevious(elem, interval){
    str = elem.value;
    
    s = str.lastIndexOf('{{',interval.start-1);
    e = str.lastIndexOf('}}',interval.end-2) + 2;
    
    interval.start = s
    interval.end = e
    
    elem.setSelectionRange(s,e);
}

function markNext(elem, interval){
    elem.focus();
    str = elem.value;
    
    s = str.indexOf('{{', interval.start + 1);
    e = str.indexOf('}}', interval.end) + 2;
    
    interval.start = s
    interval.end = e
    elem.setSelectionRange(s,e);

}

ival = new Object();
ival.start = 0
ival.end = 0

var Area = {
    template: `
        <div>
        <p>Please select a template below</p>
        <select v-model="selected">
        <option v-for='item in itemIdx' v-on:click="updateInfo">
        {{ item }}
    </option>
        </select>
        
        <br>
        <p>{{title}}</p>
        <TextArea id="area" @keyup.alt.67="traverseForward"  @keyup.alt.80="traverseBackward" rows="4" cols="50" >{{txt}}</TextArea>
        <br>
        <button v-on:click="traverseForward">forward</button>
        <button v-on:click="traverseBackward">backward</button>
        </div>
        `,
    prop: ['value'],
    data: function(){
        return {
            selected: 0,
            title: '',
            txt: '',        
            items : global_form,
            itemIdx: Object.keys(global_form),
            interval: ival
        }

    },
    methods: {
        updateInfo: function(){
            this.title = 'Form: ' + this.items[this.selected]['title'];
            this.txt = this.items[this.selected]['text'];
        },
        traverseForward: function(){
            elem = document.getElementById('area');
            markNext(elem, ival);
        },
        traverseBackward: function(){
            elem = document.getElementById('area');
            markPrevious(elem, ival);
        }
    }
}

module.exports.Area = Area;
module.exports.markNext = markNext;
module.exports.markPrevious = markPrevious;
