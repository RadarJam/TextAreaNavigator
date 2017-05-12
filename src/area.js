global_form = [
    {"title":"A","text":"text1 {{foo}} {{bar }}"},
    {"title":"B","text":"text2"},
    {"title":"C","text":"text3"},
]

function markNext(elem, interval){
    elem.focus();
    str = elem.value;
    
    s = str.indexOf('{{', interval.start + 1);
    e = str.indexOf('}}', interval.end) + 2;

    interval.start = s
    interval.end = e
    elem.setSelectionRange(s,e);

}

var Area = {
    template: `
        <div>
        <p>Please select template</p>
        <select v-model="selected">
        <option v-for='item in itemIdx' v-on:click="updateInfo">
        {{ item }}
    </option>
        </select>
        
        <br>
        <p>{{title}}</p>
        <p>Text</p>
        <TextArea>{{txt}}</TextArea>
        </div>
        `,
    prop: ['value'],
    data: function(){
        return {
            selected: 0,
            title: 'please select a form',
            txt: 'the content will be displayed here',        
            items : global_form,
            itemIdx: Object.keys(global_form)
        }

    },
    methods: {
        updateInfo: function(){
            this.title = 'Form: ' + this.items[this.selected]['title'];
            this.txt = this.items[this.selected]['text'];
        }
    }
}

module.exports.Area = Area;
module.exports.markNext = markNext;
