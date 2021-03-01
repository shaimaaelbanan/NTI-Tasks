let showHideBtn = document.querySelector('#showhide')
let studentsTable = document.querySelector('#studentsTable')
let students = []
let studentForm = document.querySelector('#addStudent')
let tableHeaders= ['id','name','class','age','degree','grade','actions']
let actions = [
    {txt:'delete', classes:'btn btn-danger m-1'},
    {txt:'edit degree', classes:'btn btn-warning m-1'}
]
showHideBtn.addEventListener('click', function(e){
    this.innerText=="show form"? this.innerText="hide form" : this.innerText="show form";
    studentForm.classList.toggle('d-none')
})
studentForm.addEventListener('submit',function(e){
    e.preventDefault()
    let student = {
        name: this.elements.name.value,
        class: this.elements.class.value,
        age: this.elements.age.value,
        degree: this.elements.degree.value,
    }
    students.push(student)
    this.reset()
    this.classList.toggle('d-none')
    showHideBtn.innerText="show form"
    showStudents()
})
let addElement = function(eleType, parent, txt='', classes=''){
    ele = document.createElement(eleType)
    if(txt!='') ele.innerText = txt
    if(classes!='') ele.classList=classes
    parent.appendChild(ele)
    return ele
}
let showStudents = function(){
    studentsTable.innerText=''
    students.forEach((student, i)=>{
        tr = addElement('tr', studentsTable)
        tableHeaders.forEach(element=>{ 
            if(element=="id") txt = i+1
            else if(element=='grade') txt = getGrade(i)
            else if(element=='actions') txt = ''
            else txt=student[element]
            td = addElement('td', tr, txt)
        })
        actions.forEach(action=>{
            btn = addElement('button', td, action.txt, action.classes)
            btn.addEventListener('click',function(e){
                if(action.txt=='edit degree') editDegree(i)
                else if(action.txt=='delete') deleteStudent(i)             
            })
        })
    })
}
function editDegree(index){
    let degree= Number(prompt('enter new degree'))
    students[index].degree = degree
    showStudents()
}
function getGrade(index){
    if (students[index].degree>= 90) return 'A'
    else if (students[index].degree >= 80) return 'B'
    else if (students[index].degree >= 70) return 'C'
    else if (students[index].degree >= 60) return 'D'
    else return 'F'
}
function deleteStudent(index){
    students.splice(index,1)
    showStudents()
}

showStudents()




