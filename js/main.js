'use strict'

var gNums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36]
var gNextNum = 1
var gTime = 0
var timeStart
var gElLevels = document.querySelectorAll('input[name="level"]')
var gTimeStart
var gCurrLevel = 1

function init() {
    renderBoard()
}


function renderBoard() {
    gNextNum = 1
    resetTime()
    resetNums()
    var strHTML = ''
    var elBoard = document.querySelector('.board') 
    var boardSize
    var numsIdx 
    
    if (gElLevels[0].checked) boardSize= 4, numsIdx = 16 ,gCurrLevel = 1 
    else if (gElLevels[1].checked) boardSize= 5, numsIdx = 25 ,gCurrLevel = 2
    else if (gElLevels[2].checked) boardSize= 6, numsIdx = 36 ,gCurrLevel = 3
    var nums = gNums.splice(0,numsIdx)
    

    for (var i = 0; i < boardSize ;i++) {
        strHTML += '<tr>\n'
        for (var j = 0; j < boardSize; j++) {
            strHTML += `<td onclick="cellClicked(this)">${drawNum(nums)}</td>`
        }
        strHTML += '</tr>\n' 
    }
    elBoard.innerHTML = strHTML
}


function drawNum(nums) {
    var idx = getRandomInt(0, nums.length)
    var num = nums.splice(idx, 1)
    return num
}

function cellClicked(elBtn){
    var elNextstepSpan = document.querySelector('.nextstep span')
    elNextstepSpan.innerText = gNextNum +1
    var cellNum = +elBtn.innerText
    if (gNextNum === cellNum){ 
        elBtn.style.backgroundColor = 'green'
        gNextNum++   
    }   
    if (cellNum ===1) startClock()
    if (cellNum === 16 && gCurrLevel === 1) return stopWatch() 
    if (cellNum === 25 && gCurrLevel === 2) return stopWatch()
    if (cellNum === 36 && gCurrLevel === 3) return stopWatch()

}

function startClock(){
    timeStart = new Date()
   gTimeStart = setInterval(updateClock,1)
    
}

function updateClock(){
    var elTimer = document.querySelector('.timer span')
    var timeNow = new Date()
    var timePass = new Date (timeNow -timeStart)
    var sec = timePass.getSeconds()
    var milliSeconds = timePass.getMilliseconds()
    elTimer.innerHTML= `${sec}.${milliSeconds}`
}

function resetNums(){
    gNums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36]
}

function resetTime(){
    stopWatch()
    var elTimer = document.querySelector('.timer span')
    elTimer.innerHTML= `0.00`
    
}

function stopWatch(){
    clearInterval(gTimeStart)
}

