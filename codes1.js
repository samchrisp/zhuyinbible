// Define global variables
//var audiohome = "/有聲聖經/Spring/台語巴克禮/";
var total_chapter_num = 0;//共讀幾章
var begin2, end2;//開始與結束的章數
var total_lines = 0;
var SEARCHANY     = 1;
var SEARCHALL     = 2;
var SEARCHURL     = 4;
var searchType  = '';
var everyday_chapter1;
var showMatches   = 2000;
var currentMatch  = 0;
var copyArray   = new Array();
var nowbook = 39;
var nowchapter = 0;
var findbook = new Array();
var findchapter = new Array();
var operators = new Array("#", "*", "&", "|", "+", "!", "(", ")");
var icp = new Array(3, 2, 2, 2, 2, 1, 0, 3);
var isp = new Array(3, 2, 2, 2, 2, 1, 3, 3);
var readedchapter = new Array();
var cnums=new Array(50,40,27,36,34,24,21,4,31,24,22,25,29,36,10,13,10,42,150,31,12,8,66,52,5,48,12,14,3,9,1,4,7,3,3,3,2,14,4, 28,16,24,21,28,16,16,13,6,6,4,4,5,3,6,4,3,1,13,5,5,3,5,1,1,1,22);
var day_plan = new Array();
var out_OL, out_mp3, hh, llength, myadjust, myadjust2;
var zero1 = 0, yy = 200, diff2 = 0, dd1 = 1;
var vlength = new Array();
var chlength, curr, line3, culength = 0;
var Ypos, currY, Ypos1, step1=0;
var s01;

function location01() {
  a01 = document.getElementById("audio01");
  audiohome = a01.value;
}

function speed01() {
  s01 = document.getElementById("speed");
  out_mp3.playbackRate = s01.value;
}

function endofvoice(opstr, bnum, cn) {
	if(everyday_chapter1.value == 0){
		everyday_chapter1.value = -1;
	} else {
		setchap1(Reading, opstr, bnum, cn);
	}
}
function setchap1(f, opstr, bnum, cn) {
        var i,j,k,txt;
	
	var currentchapters = cn;
	
	if (cn == -1) {
		bnum--;
		cn = cnums[bnum] - 1;
	}
	if (cn == cnums[bnum]) {
		bnum++;
		cn = 0;
	}
	i=cnums[bnum];

	if(i == 150)
	  for(j = 1; j <= 150;j++) {
	    txt = "第 " + j + " 篇";
	    f.chap.options[j-1] = new Option(txt, j);	
	  }
	else if(i < 150){
	  for(j = 1; j <= i; j++) {
	    txt = "第 " + j + " 章";
	    f.chap.options[j-1] = new Option(txt, j);
	  }
	  for(j = 150;j > i;j--)
	    f.chap.options[j-1] = null;
	}

	f.chap.options[0].selected = cn;
	readchapter(opstr, bnum, cn);
}


function readchapter(opstr, bnum, cnum) {
  var out1, out2, out3, k, operand ="";

  while (opstr.charAt(opstr.length - 1) == ' ') //清掉結尾的空格
    opstr = opstr.substring(0,opstr.length - 1);

  if(opstr.length > 0)
    operand = opstr.split(" ");


  if((bnum - 0 < 0) || (bnum - 0 >= 66))
    bnum = 0;
  if((bnum - 0 <= 0) && (cnum - 0 < 0))
    cnum = 0;
  if((bnum - 0 >= 65) && (cnum - 0 >=22))
    cnum = 21;
  if(cnum - 0 < 0) {
      bnum--;
      cnum = book_chapters[bnum+1] - book_chapters[bnum]-1;
  }
  if(cnum - 0 >= book_chapters[bnum+1] - book_chapters[bnum]) {
      bnum++;
      cnum = 0;
  }
  var line1 = chapter_lines[book_chapters[bnum]+cnum];  
  var line2 = chapter_lines[book_chapters[bnum]+cnum+1];
  line3 = line2 - line1;
  var tempNode1, tempNode2;
  var value1 = 1;

  chapter_number = 'C-ver075-' + Number(book_chapters[bnum]+cnum);
  readedchapter[book_chapters[bnum]+cnum] = 1;
  everyday_chapter1 = document.getElementById("Chinese-everyday");
  if ((localStorage.getItem(chapter_number) == null) || (localStorage.getItem(chapter_number) == 0)){
	everyday_chapter1.value--;
  }
  localStorage.setItem(chapter_number, 1);

  out1 = document.getElementById("nothing");
  if(books[bnum] != "詩篇") {
    if(cnums[bnum] > 1)
      out1.innerHTML = '<a href="" onClick="readchapter(\'' + opstr + '\',' + bnum + ',' +cnum+'); return false;">' + books[bnum] + '第' + numbers[cnum] + '章</a>-共' + line3 + '節<br>\n';
    else
      out1.innerHTML = '<a href="" onClick="readchapter(\'' + opstr + '\',' + bnum + ',' +cnum+'); return false;">' + books[bnum] + '</a>-共' + line3 + '節<br>\n';
    document.title = books[bnum] + '第' + numbers[cnum] + '章';
  }
  else {
    out1.innerHTML = '<a href="" onClick="readchapter(\'' + opstr + '\',' + bnum + ',' +cnum+'); return false;">' + books[bnum] + '第' + numbers[cnum] + '篇</a>-共' + line3 + '節<br>\n';
    document.title = books[bnum] + '第' + numbers[cnum] + '篇';
  }
  out1.style.color = "red";
  out1.style.fontSize = "32";
  out1.style.textAlign = "center";

  bnum1 = bnum + 1;
  cnum1 = cnum + 1;
  if(bnum1 < 10)
    temp10 = '0' + bnum1 + '_';
  else
    temp10 = bnum1 + '_';
  if(cnum + 1 < 10)
     temp10 = temp10 + '00' + cnum1 + '.mp3';
  else if (cnum + 1 < 100)
     temp10 = temp10 + '0' + cnum1 + '.mp3';
  else 
     temp10 = temp10 + cnum1 + '.mp3';
  temp11 = audiohome + temp10;
  out_test = document.getElementById("test");
  autos = document.getElementById("auto1");
  out_mp3 = document.createElement("audio");
  out5 = document.createElement("source");
  out5.setAttribute("src", temp11);
  out5.setAttribute("type", "audio/mp3");
  out_mp3.appendChild(out5);
  out_mp3.setAttribute("id", "mp3_player");
  out_mp3.setAttribute("controls", "controls");
  out_mp3.setAttribute("preload", "auto");
  if((autos.checked == true) && (everyday_chapter1.value >= 0))
    out_mp3.setAttribute("autoplay", "autoplay");
  out_test.removeChild(out_test.childNodes[0]);
  out_test.appendChild(out_mp3);
  speed01();

  out2 = document.createElement("DIV");
  out2.style.color = "black";
  out2.style.fontSize = "50";
  out2.style.textAlign = "left";
  out1.appendChild(out2);
  out_OL = document.createElement("OL");
  out2.appendChild(out_OL);
  var j = 0;
  chlength = (cnums[bnum] > 1) ? books[bnum].length + numbers[cnum].length + 2 : books[bnum].length;
/*  if(cnums[bnum] > 1)
    chlength = books[bnum].length + numbers[cnum].length + 2;
  else 
    chlength = books[bnum].length; */
  for (var i = line1; i < line2; i++) {
//      var oneline = profiles[i];
      var oneline = profiles[i].substring(profiles[i].indexOf(" "));
      voiceLength = oneline.length;
      tempLine = oneline;
      while(tempLine.indexOf("【") > -1){
        tempLine = tempLine.substring(tempLine.indexOf("【"));
        if(tempLine.indexOf("】") > 0){
	  tlen = tempLine.indexOf("】");
	  tempLine = tempLine.substring(tlen);
        } else {
	  tlen = tempLine.length;
	  tempLine = "";
        }
        voiceLength -= tlen+1;
      }
      vlength[j++] = voiceLength;
      chlength += voiceLength;
      tempNode1 = document.createElement("LI");
      k = 0;
      while(k < operand.length && opstr.length > 0) {
	var temp ="";
	var compareString = operand[k];
	while(oneline.indexOf(compareString) != -1) {
	  temp += oneline.substring(0, oneline.indexOf(compareString)) + compareString.fontcolor("red");
	  oneline = oneline.substring(oneline.indexOf(compareString)+compareString.length);
	}
        temp += oneline;
        oneline = temp;
        k++;
      }
      tempNode1.innerHTML = oneline;
      out_OL.appendChild(tempNode1);
//      out2.appendChild(tempNode1);
//      tempNode1.setAttribute("value", value1++);
      ii = 'ii' + value1;
      tempNode1.setAttribute("value", value1++);
      tempNode1.setAttribute("id", ii);
  }
  
  precnum = cnum -1;
  bbnum = bnum;
  if(cnum == 0){
    bbnum = bnum - 1;
    precnum = cnums[bbnum] - 1;
  }
  if((bnum > 0) || (cnum > 0))
    if(bbnum != 18)
      if(cnums[bbnum] > 1)
	temp1 = '<a href="" onClick="setchap1(Reading, \'' + opstr + '\',' + bbnum + ',' + precnum+'); return false;">' + books[bbnum] + '第' + numbers[precnum] + '章</a>\n';
      else
	temp1 = '<a href="" onClick="setchap1(Reading, \'' + opstr + '\',' + bbnum + ',' + precnum+'); return false;">' + books[bbnum] + '</a>\n';
    else 
	temp1 = '<a href="" onClick="setchap1(Reading, \'' + opstr + '\',' + bbnum + ',' + precnum+'); return false;">' + books[bbnum] + '第' + numbers[precnum] + '篇</a>\n';
  else
    temp1 = '';
  
  nextcnum = cnum +1;
  bbnum = bnum;
  if(cnum == cnums[bnum]-1){
    bbnum = bnum + 1;
    nextcnum = 0;
  }
  if(!((bnum == 65)&&(cnum == 21)))
    if(bbnum != 18)
      if(cnums[bbnum] > 1) {
	temp2 = '<a href="" onClick="setchap1(Reading, \'' + opstr + '\',' + bbnum + ',' + nextcnum+'); return false;">' + books[bbnum] + '第' + numbers[nextcnum] + '章</a>\n';
	if(autos.checked == true){
//	  temptemp = 'setchap1(Reading, \'' + opstr + '\',' + bbnum + ',' + nextcnum+')';
	  temptemp = 'endofvoice(\'' + opstr + '\',' + bbnum + ',' + nextcnum + ')';
	  if(everyday_chapter1.value >= 0)
	    out_mp3.setAttribute("onended", temptemp);
	}
      }
      else {
	temp2 = '<a href="" onClick="setchap1(Reading, \'' + opstr + '\',' + bbnum + ',' + nextcnum+'); return false;">' + books[bbnum] + '</a>\n';
	if(autos.checked == true){
//	  temptemp = 'setchap1(Reading, \'' + opstr + '\',' + bbnum + ',' + nextcnum+')';
	  temptemp = 'endofvoice(\'' + opstr + '\',' + bbnum + ',' + nextcnum + ')';
	  if(everyday_chapter1.value >= 0)
	    out_mp3.setAttribute("onended", temptemp);
	}
      }
    else {
      temp2 = '<a href="" onClick="setchap1(Reading, \'' + opstr + '\',' + bbnum + ',' + nextcnum+'); return false;">' + books[bbnum] + '第' + numbers[nextcnum] + '篇</a>\n';
      if(autos.checked == true){
//	temptemp = 'setchap1(Reading, \'' + opstr + '\',' + bbnum + ',' + nextcnum+')';
	temptemp = 'endofvoice(\'' + opstr + '\',' + bbnum + ',' + nextcnum + ')';
	if(everyday_chapter1.value >= 0)
	  out_mp3.setAttribute("onended", temptemp);
      }
    }
  else
    temp2 ='';

  cchapter = book_chapters[bnum]+cnum;
  temp3 = '<a href="" onClick="unread(' + cchapter + '); return false;">設為未讀</a>\n';
  out3 = document.createElement("DIV");
  out3.innerHTML = "";
  out3.innerHTML += temp1;
  out3.innerHTML += temp2;
  out3.innerHTML += temp3;
  out1.appendChild(out3);

 nowbook = bnum;
  nowchapter = cnum;

//  var ua = navigator.userAgent.toLowerCase();
  
  tempNode1 = document.getElementById("link2");
  tempNode1.innerHTML = "";
  tempNode1.innerHTML += temp1;
  tempNode1.innerHTML += "<br>";
  tempNode1.innerHTML += temp2;
//  if((ua.indexOf("chrome") != -1) || (ua.indexOf("safari") != -1))
//    location.href = location.href;
  location.hash = '#top';
  location = location;
  
//  if((ua.indexOf("firefox") != -1))
  location.hash = '#' + bnum + '_' + cnum;

  book_selet = document.getElementById("book1");
  book_selet.selectedIndex = bnum;
  chapter_selet = document.getElementById("chapter1");
  chapter_selet.selectedIndex = cnum;

  process_percentage();
  countchapter();
  curr = culength = 0;
  if((autos.checked == true) && (everyday_chapter1.value >= 0)){
	myadjust = setInterval(function () {adjust_page3()}, yy);
  }
  
}

function findYPos(obj) {
	var curtop = 0;
	if (obj.offsetParent) 
		do {
			curtop += obj.offsetTop;
		} while (obj = obj.offsetParent);
		
	return curtop;
}
	
function adjust_page3() {
  llcurr = out_mp3.currentTime-1;
  llength = out_mp3.duration-3;
  if(culength/chlength < llcurr/llength){
	culength += vlength[curr++];
  }
  _test1 = document.getElementById("test1");
  if(curr+1 < line3){
     ii = 'ii' + Number(curr+1);
     ele = document.getElementById(ii);
     Ypos = findYPos(ele);
  } else {
  	ii = 'ii' + Number(curr-1);
	ele = document.getElementById(ii);
	Ypos1 = findYPos(ele);
	if(Ypos1 > window.pageYOffset + window.innerHeight*0.7){
  _test1.innerHTML = "<img src='Moving-animated-up-arrow.gif' />";
  step1 = 0;
	  window.scrollTo(0, Ypos1);
	}
  }
  
  if(Ypos > window.pageYOffset + window.innerHeight*0.95){
//  if(Ypos > window.pageYOffset){
  	ii = 'ii' + Number(curr-1);
	ele = document.getElementById(ii);
	Ypos1 = findYPos(ele);
  _test1.innerHTML = "<img src='Moving-animated-up-arrow.gif' />";
  step1 = 0;
	
	window.scrollTo(0, Ypos1);
  }else if(step1 > 10){
  }else{
  _test1.innerHTML = "";
  }
  step1++;
  if(curr >= line3){
     clearInterval(myadjust);
  _test1.innerHTML = "";
  }
}

function adjust_page2() {
  var diff1
  llcurr = out_mp3.currentTime;
//  hh = document.body.offsetHeight;
  hh = out_OL.offsetHeight;
  llength = out_mp3.duration;
  if(culength/chlength < llcurr/llength){
	culength += vlength[curr++];
  }

  y = window.pageYOffset;
  
  if(curr >= nowpos + adjust - 1){
	zero1 = 0;
//	dd1 = hh * llcurr/llength;
	dd1 = 0.4*hh * llcurr/llength + 0.6*hh * curr/line3;
	window.scrollTo(0, dd1+100);
//	nowpos = curr;
	nowpos += adjust;
  } else{
	zero1++;
	if(zero1 >= 10) {
	  zero1 = 0;
	  clearInterval(myadjust);
	  yy = yy + 1;
	  myadjust = setInterval(function () {adjust_page3()}, yy);
	}
  }
}

function adjust_page() {
  var diff1
  llcurr = out_mp3.currentTime;
//  hh = document.body.offsetHeight;
  hh = out_OL.offsetHeight;
  llength = out_mp3.duration;
  if(culength/chlength < llcurr/llength){
	culength += vlength[curr++];
/*	temp1_1 = document.getElementById("plan");
	temp1_1.innerHTML += " culength=" + culength;
	temp1_1.innerHTML += " curr=" + curr;
	temp1_1.innerHTML += " line3=" + line3;
	temp1_1.innerHTML += " llcurr=" + llcurr;
	temp1_1.innerHTML += " llength=" + llength + "<br />\n";*/
  }
  diff1 = 1/line3 - culength/chlength+llcurr/llength;
  pp = 0.6*hh*(curr/line3+((diff1 <1/line3) && (diff1 > 0) ? diff1 : 0));// 現在這個版本好像有好一點，用加的才行，再試看看。
  pp += 0.4*hh * llcurr / llength;
//  pp += 0.5*hh * llcurr / llength + 0.01 * hh;
//  pp = hh * llcurr / llength;

	 y = window.pageYOffset;
 
  if (llength - llcurr <= 1)
	clearInterval(myadjust);
  else if((pp - y < 1) && (pp - y > -1)){
	zero1++;
	if(zero1 >= 1) {
	  zero1 = 0;
	  clearInterval(myadjust);
	  yy = yy + 1;
	  myadjust = setInterval(function () {adjust_page()}, yy);
	}
  } else  if(pp > y) {
	zero1 = 0;
//	window.scrollBy(0, pp-y);
	window.scrollBy(0, dd1);
  }
  else  if(pp < y - 5){
	zero1 = 0;
	window.scrollBy(0, -dd1);
  }
  if((pp > y + 2) || (pp + 2 < y)){
	diff2++;
	if(diff2 >= 2){
	  diff2 = 0;
	  clearInterval(myadjust);
	  if((pp > y + 200) ||(pp < y - 200)) 
		dd1 = 50;
	  else if((pp > y + 100) || (pp < y - 100)){
	    yy = 5;
	    dd1 = 1;
	  }  else if ((pp > y + 50) || (pp < y - 50)){
	    yy = 10;
	    dd1 = 1;
	  }  else 
	    yy = yy - 1;
	  myadjust = setInterval(function () {adjust_page()}, yy);
	}
  }
	
}

//將運算子 ch 的兩旁加上空格
function replacing (s1, ch) {
  var ss = s1;
  while (ss.indexOf(ch) != -1) 
     ss = ss.replace(ch, " § ");
  while (ss.indexOf("§") != -1) 
     ss = ss.replace(/§/, ch);
  return ss;
}

// Determine the type of search, and make
// sure the user has entered something
function validate(entry, begin1, end1) {
  var i;

  entry = entry.toLowerCase();
  for(i = 1;i < 8;i++) //將每個運算子兩旁都加上空格
     entry = replacing(entry, operators[i]);

  while (entry.indexOf("  ") != -1)  //這裡是要清掉多餘的空格 2007/11/8
     entry = entry.replace(/  /, " ");
  
  if (entry.charAt(0) == "+") {
    entry = entry.substring(1,entry.length);
    searchType = SEARCHALL;
    }
  else if (entry.substring(0,4) == "url:") {
    entry = entry.substring(5,entry.length);
    searchType = SEARCHURL;
    }
  else { searchType = SEARCHANY; }

  while (entry.charAt(0) == ' ')  //清掉開頭的空格
    entry = entry.substring(1,entry.length);

  while (entry.charAt(entry.length - 1) == ' ') //清掉結尾的空格
    entry = entry.substring(0,entry.length - 1);
  document.search.query.value = entry;

  convertString(entry, begin1, end1);
  }

// 將搜尋字串切割成合適的 tokens 
function convertString(reentry, begin1, end1) {
  var searchArray = reentry.split(" ");
  allowAny(searchArray, begin1, end1);
}

//計算 postfix 運算式 convert 的值
function evaluate(convert) {
  var stack = new Array(0);
  var top = -1;

  for(i = 0;i < convert.length;i++) {
     if((convert[i] == false) || (convert[i] == true))
	stack[++top] = convert[i];
     else
	     if((convert[i].charAt(0) == "!")) {
		if(stack[top]) stack[top] = false;
		else stack[top] = true;
      	     }
	     else if(((convert[i].charAt(0) == "*") || (convert[i].charAt(0) == "&")) && (top >= 1)) {
		if(stack[top-1] && stack[top]) stack[top-1] = true;
		else stack[top-1] = false;
		top--;
	     } 
	     else if(((convert[i].charAt(0) == "+") || (convert[i].charAt(0) == "|")) && (top >= 1)) {
		if(stack[top-1] || stack[top]) stack[top-1] = true;
		else stack[top-1] = false;
	        top--;
	   }
  }
  for(i = top;i > 0;i--) 
     if(stack[i-1] && stack[i]) stack[i-1] = true;
     else stack[i-1] = false;
  
  return stack[0];
}

//將 infix 型式的運算式 t 轉成 postfix 型式的運算式
function postfix(t) {
  var stack = new Array();
  var top = -1;
  var i = 0, j, k = 0;
  var pp = new Array();

  stack [++top] = 0;
  while(i < t.length) {
     for(j = 0;j < 9;j++)
	if(t[i] == operators[j])
	   break;
     if(j == 9) pp[k++] = t[i];
     else if (j == 8) {
	while((top > 0) && (stack[top] != 7)) 
	   pp[k++] = operators[stack[top--]];
	if(stack[top] == 7) top--;
     } else {
	while(isp[stack[top]] <= icp[j])
	   pp[k++] = operators[stack[top--]];
	stack[++top] = j;
     }
     i++;
  }
  while(top >0) pp[k++] = operators[stack[top--]];
  return pp;
}

// Define a function to perform a search that requires
// a match of any of the terms the user provided
function allowAny(t, begin1, end1) {
  var findings = new Array(0);
  var operand = new Array(0);
  var operandpoint = new Array(0);
  var convert =new Array(0);
  var power2 = 1;
  var value = new Array(0);
  var i, j, k;


  t = postfix(t);
  opnum = 0;
  for (j = 0; j < t.length; j++) {
     if((t[j].charAt(0) == "*") || (t[j].charAt(0) == "+") || (t[j].charAt(0) == "!") || (t[j].charAt(0) == "&") || (t[j].charAt(0) == "|"))
	convert[j] = t[j];
     else {
	convert[j] = true;
	operandpoint[opnum] = j;
	operand[opnum++] = t[j];
     }
  }

  for(i = 0;i < opnum;i++)
     power2 *= 2;

  for(i = 0;i < power2;i++) {
     k = i;
     for(j = 0;j < opnum;j++) {
	if(k % 2 == 0)
	   convert[operandpoint[j]] = false;
	else
	   convert[operandpoint[j]] = true;
	k = k >> 1;
     }
     if(evaluate(convert)) value[i] = true;
     else value[i] = false;
  }


  nowbook = 0;
  nowchapter = 0;
  for (i = chapter_lines[book_chapters[begin1]]; i < chapter_lines[book_chapters[end1+1]]; i++) {
    var oneline = profiles[i];
    var ok = true;
    var compareElement  = profiles[i].toLowerCase();

    if(searchType == SEARCHANY) { var refineElement  = compareElement.substring(0,compareElement.indexOf('|HTTP')); }
    else { var refineElement = compareElement.substring(compareElement.indexOf('|HTTP'), compareElement.length); }

    var index1 = 0;
    compareElement = compareElement.substring(compareElement.indexOf(" ")+1, compareElement.length);
    for (j = opnum-1; j >= 0; j--) { 
      if (compareElement.indexOf(operand[j]) == -1) 
	      index1 += 0;
      else
	      index1 += 1;
      index1 *= 2;
    }
    index1 /= 2;
    if(!value[index1]) continue;

    for (j = 0; j < operand.length; j++) {
      var compareString = operand[j];
      var temp = "";

      if (compareElement.indexOf(compareString) != -1) {
        while(chapter_lines[book_chapters[nowbook]+nowchapter+1] <= i) {
       	  nowchapter++;
          if(nowchapter + book_chapters[nowbook] > book_chapters[nowbook+1]) {
      	    nowchapter = 0;
      	    nowbook++;
          }
        }
        findbook[findings.length] = nowbook;
        findchapter[findings.length] = nowchapter;

        temp = oneline.substring(0, oneline.indexOf(" ")+1);
        oneline = oneline.substring(oneline.indexOf(" ")+1);
        while(oneline.indexOf(compareString) != -1) {
          temp += oneline.substring(0, oneline.indexOf(compareString)) + compareString.fontcolor("red");
          oneline = oneline.substring(oneline.indexOf(compareString)+compareString.length);
        }
        temp += oneline;
        oneline = temp;
        }
      }
      findings[findings.length] = oneline;
    }
  verifyManage(operand, findings);
  }

// Determine whether the search was successful
// If so print the results; if not, indicate that, too
function verifyManage(operand, resultSet) {
  if (resultSet.length == 0) { noMatch(); }
  else {
    copyArray = resultSet;
    formatResults(operand, copyArray, currentMatch, showMatches);
    }
  }

// Define a function that indicates that the returned no results
function noMatch() {
  var out, out2, out3;
  
  out3 = document.getElementById("nothing");
  out3.innerHTML =  '<HR NOSHADE WIDTH=100%>"' + document.search.query.value +
    '" returned no results.<HR NOSHADE WIDTH=100%></TD></TR></TABLE>';
  }

// Define a function to print the results of a successful search
function formatResults(operand, results, reference, offset) {
  var currentRecord = (results.length < reference + offset ? results.length : reference + offset);
  var out, out1, out2, out3, tempNode1, tempoperand;

  document.title = '搜尋經文─' + document.search.query.value;
  tempoperand = "";
  for(var j = 0;j < operand.length;j++)
	  tempoperand += operand[j] + ' ';

  out = document.getElementById("nothing");
  out.style.color = "black";
  out.style.fontSize = "24";
  out.style.textAlign = "left";
  out.innerHTML = 'Search Query: <i>' + document.search.query.value + '</i><br>\n';
  out.innerHTML += 'Search Results: <i>' + (reference + 1) + ' - ' +
    currentRecord + ' of ' + results.length + '</i><br>' +
    '\n\n<!-- Begin result set //-->\n\n\t';
  out2 = document.createElement("OL");
  out.appendChild(out2);

  var value1 = 1;
  if (searchType == SEARCHURL) {
    for (var i = reference; i < currentRecord; i++) {
	tempNode1 = document.createElement("LI");
	tempNode1.innerHTML = results[i];
	out2.appendChild(tempNode1);
	tempNode1.setAttribute("value", value1++);
      }
    }
  else {
    for (var i = reference; i < currentRecord; i++) {
      var oneline = results[i].substring(results[i].indexOf(" "), results[i].length);
      var temp = results[i].substring(0, results[i].indexOf(" "));
//	out3 = document.createElement("OL");
//	out2.appendChild(out3);
	tempNode1 = document.createElement("LI");
	tempNode1.innerHTML = '<a href="" onClick="readchapter(\'' + tempoperand + '\', ' + findbook[i]+ ', ' + findchapter[i]+ '); return false;">' + temp + '</a> ' + oneline + '\n';
//	out3.appendChild(tempNode1);
	out2.appendChild(tempNode1);
	tempNode1.setAttribute("value", value1++);
      }
    }
  }

function process_percentage(){
	if(typeof(Storage)=="undefined") return;

	total_length = 0;
	begin2 = document.getElementById("begin2").selectedIndex;
	end2 = document.getElementById("end2").selectedIndex;
	total_chapter_num = book_chapters[end2+1] - book_chapters[begin2];
	total_lines = chapter_lines[book_chapters[end2+1]] - chapter_lines[book_chapters[begin2]];
	for(i = book_chapters[begin2];i <book_chapters[end2+1];i++)
		total_length += chapter_length[i];

	var outs = document.getElementById("start1");
	var outf = document.getElementById("finish1");
	var outd = document.getElementById("duration");
	var dd = new Date();
	var year = dd.getFullYear();
	var Sdate = new Date();
	Sdate.setTime(0);
	Sdate.setFullYear(year);
	Sdate.setMonth(dd.getMonth());
	Sdate.setDate(dd.getDate());
	var start1 = Sdate.getTime();
	if (localStorage.getItem("C-ver075-start1") != null)
		start1 = localStorage.getItem("C-ver075-start1");
	Sdate.setTime(start1);
	var Fdate = new Date();
	Fdate.setTime(0);
	Fdate.setFullYear(Sdate.getFullYear()+1);
	Fdate.setMonth(dd.getMonth());
	Fdate.setDate(dd.getDate());
	var finish1 = Fdate.getTime();
	var duration = finish1 - start1;
	if (localStorage.getItem("C-ver075-duration") != null)
		duration = localStorage.getItem("C-ver075-duration");
	finish1 = Number(start1) + Number(duration);
	Fdate.setTime(Number(finish1));
	Sdate.setTime(start1);
	localStorage.setItem("C-ver075-start1", start1);
	localStorage.setItem("C-ver075-duration", duration);
	outd.value = Math.ceil(duration/86400000);
	outs.value = Sdate.toISOString().substr(0, Sdate.toISOString().indexOf("T"));
	outf.value = Fdate.toISOString().substr(0, Fdate.toISOString().indexOf("T"));
	var now1 = dd.getTime();
	var days = (now1-start1)/86400000;
	var fchapter = new Date(), fline = new Date(), flength = new Date();
	var fudays = Math.ceil((Number(finish1) - Number(now1))/86400000);
	
	readedC = 0;
	readedClines = 0;
	readed_length = 0;
	for(var i = book_chapters[begin2];i <book_chapters[end2];i++){
		chapter_number = 'C-ver075-' + Number(i);
		readedchapter[i] = localStorage.getItem(chapter_number);
//		readedchapter[i] = localStorage.getItem(Number(i));
		if (readedchapter[i] == 1){
		    readedC++;
		    readedClines += chapter_lines[i+1] - chapter_lines[i];
		    readed_length += chapter_length[i];
		}
	}
	num1 = readedC/total_chapter_num * 100;
	num2 = readedClines/total_lines * 100;
	if(days > 0)
		num3 = readedC/days;
	else
		num3 = readedC;
	num4 = readed_length / total_length * 100;
	if(duration == 0) duration = 1;
	num5 = (now1 - start1) / duration * 100;
	percentage = document.getElementById("percentage");
	percentage.style.color = "black";
	percentage.style.fontSize = "24";
	percentage.style.textAlign = "left";
	percentage.innerHTML = '共讀 ' + readedC + ' 章，\n';
	percentage.innerHTML += '全部章數：' + total_chapter_num + ',\n';
	percentage.innerHTML += '章：' + num1.toFixed(2) + '%，\n';
	percentage.innerHTML += '節：' + num2.toFixed(2) + '%\n';
	percentage.innerHTML += '長度：' + num4.toFixed(2) + '%\n';
	percentage.innerHTML += '時間：' + num5.toFixed(2) + '%<br>\n';
	if(fudays > 0)
		num1 = (total_chapter_num - readedC)/fudays;
	else
		num1 = total_chapter_num - readedC;
	num2 = total_chapter_num / duration * 86400000;
	percentage.innerHTML += '共' + days.toFixed(2) + '天,每天應：' + num2.toFixed(2) + ' 實際：'+ num3.toFixed(2) + ' 章\n';
	percentage.innerHTML += ' 未來每天：' + num1.toFixed(2) + ' 章<br>\n';
	if(readedC == 0) readedC = 1;
	if(readedClines == 0) readedClines = 1;
	if(readed_length == 0) readed_length = 1;
	fchapter.setTime(Number(start1) + (now1-start1) *total_chapter_num/ readedC);
	fline.setTime(Number(start1) + (now1-start1) * total_lines / readedClines);
	flength.setTime(Number(start1) + (now1-start1) * total_length / readed_length);
	percentage.innerHTML += '預估完成日期 \n';
	percentage.innerHTML += '章：' + fchapter.toISOString().substr(0, fchapter.toISOString().indexOf("T"));
	percentage.innerHTML += ' 節：' + fline.toISOString().substr(0, fline.toISOString().indexOf("T"));
	percentage.innerHTML += ' 長度：' + flength.toISOString().substr(0, flength.toISOString().indexOf("T")) + '<br>\n';

	percentage.innerHTML += '讀經進度：\n';
	percentage.innerHTML += '(<a href="" onClick="reset1(); return false;">清除所有記錄</a>)<br>\n';
	out3 = document.createElement("ol");
	percentage.appendChild(out3);
	OK = 0;
	for(var i = 0;i < 66;i++){
		for(var j = book_chapters[i];j < book_chapters[i+1];j++)
		  if(readedchapter[j] != 1) {
			num1 = j - book_chapters[i];
			num2 = num1+1;
			bbb = books[i];
			if(OK == 0){
				out4 = document.createElement("li");
				out3.appendChild(out4);
				OK = 1;
				out4.innerHTML += '<a href="" onClick="setchap1(Reading, \' \', ' + i + ',' + num1 + '); return false;">' + books[i] + ' ' + num2 +'</a>～';
			}
		  } else {
			if((OK == 1)&&(j > 0))
				out4.innerHTML += bbb + num2 + '\n';
			if(OK == 1)
			  OK = 0;
		  }
	}
	if((readedchapter[book_chapters[end2+1]-1] != 1) && (OK)){
		out4.innerHTML += bbb + num2 + '\n';
	}
	

/*	percentage.innerHTML += '尚未讀的有：\n';
	percentage.innerHTML += '(<a href="" onClick="reset1(); return false;">清除所有記錄</a>)<br>\n';
	for(var i = 0;i < 66;i++){
		OK = 0;
		for(var j = book_chapters[i];j < book_chapters[i+1];j++)
		  if(readedchapter[j] != 1) {
			if(OK == 0){
				num1 = j - book_chapters[i];
				OK = 1;
				percentage.innerHTML += '<a href="" onClick="setchap1(Reading, \' \', ' + i + ',' + num1 + '); return false;">' + books[i] + '</a>：\n';
			}
			percentage.innerHTML +=  j-book_chapters[i] + 1 + ' ';
		  }
		if(OK == 1)
		  percentage.innerHTML += '<br>\n';
	}
*/
}

function unread(chapter){
	if(typeof(Storage)=="undefined") return;
	readedchapter[chapter] = 0;
	chapter_number = 'C-ver075-' + Number(chapter);
	localStorage.setItem(chapter_number, 0);
//	localStorage.setItem(Number(chapter), 0);
	process_percentage();
	countchapter();
}

function reset1(){
	if(typeof(Storage)=="undefined") return;

	for(var i = 0;i < 1189;i++){
		chapter_number = 'C-ver075-' + Number(i);
		localStorage.setItem(chapter_number, 1);
		readedchapter[i] = 1;
	}

	begin2 = document.getElementById("begin2").selectedIndex;
	end2 = document.getElementById("end2").selectedIndex;
	total_chapter_num = book_chapters[end2+1] - book_chapters[begin2];
	total_lines = chapter_lines[book_chapters[end2+1]] - chapter_lines[book_chapters[begin2]];
//	temp = document.getElementById("test1");
//	temp.innerHTML = "begin2=" + begin2 + ", end2=" + end2 + ", b[b2]=" + book_chapters[begin2] + ", b[e2]=" + book_chapters[end2+1] + "<br>\n";


	for(i = book_chapters[begin2];i <book_chapters[end2+1];i++){
		chapter_number = 'C-ver075-' + Number(i);
		localStorage.setItem(chapter_number, 0);
		readedchapter[i] = 0;
	}
	process_percentage();
	countchapter();


}

function changeS(){
	if(typeof(Storage)=="undefined") return;
	var duration = localStorage.getItem("C-ver075-duration");
	var outs = document.getElementById("start1");
	var outf = document.getElementById("finish1");
	var ss = outs.value;
	var dd = ss.split("-");
//	var Sdate = new Date(Number(dd[0]), Number(dd[1])-1, Number(dd[2])+1, 0, 0, 0, 0);
	var Sdate = new Date(Number(dd[0]), Number(dd[1])-1, Number(dd[2]), 8, 0, 0, 0);
	var start1 = Sdate.getTime();
	localStorage.setItem("C-ver075-start1", start1);
	var finish1 = Number(start1) + Number(duration);
	var Fdate = new Date();
	Fdate.setTime(finish1);
	outf.value = Fdate.toISOString().substr(0, Fdate.toISOString().indexOf("T"));
	process_percentage();
	countchapter();
}

function changeD(){
	if(typeof(Storage)=="undefined") return;
	var start1 = localStorage.getItem("C-ver075-start1");
	var outd = document.getElementById("duration");
	var outf = document.getElementById("finish1");
	var du = outd.value;
	var duration = Number(du) * 86400000;
	localStorage.setItem("C-ver075-duration", duration);
	var finish1 = Number(start1) + Number(duration);
	var Fdate = new Date();
	Fdate.setTime(finish1);
	outf.value = Fdate.toISOString().substr(0, Fdate.toISOString().indexOf("T"));
	process_percentage();
	countchapter();
}

function changeF(){
	if(typeof(Storage)=="undefined") return;
	var start1 = localStorage.getItem("C-ver075-start1");
	var outd = document.getElementById("duration");
	var outf = document.getElementById("finish1");
	var ff = outf.value;
	var dd = ff.split("-");
//	var Fdate = new Date(Number(dd[0]), Number(dd[1])-1, Number(dd[2])+1, 0, 0, 0, 0);
	var Fdate = new Date(Number(dd[0]), Number(dd[1])-1, Number(dd[2]), 8, 0, 0, 0);
	var finish1 = Fdate.getTime();
	var duration = Number(finish1) - Number(start1);
	localStorage.setItem("C-ver075-duration", duration);
	outd.value = Math.ceil(duration/86400000);
	process_percentage();
	countchapter();
}

function changeB() {
	var bb = document.getElementById("begin2").selectedIndex;
	var ee = document.getElementById("end2").selectedIndex;
	if(bb > ee) {
		document.getElementById("end2").selectedIndex = bb;
	}
}

function changeE() {
	var bb = document.getElementById("begin2").selectedIndex;
	var ee = document.getElementById("end2").selectedIndex;
	if(bb > ee) {
		document.getElementById("begin2").selectedIndex = ee;
	}
}

function everyday(){
	if(typeof(Storage)=="undefined") return;
	var chapter1 = document.getElementById("Chinese-everyday");
	var Now1 = new Date();
	var now1 = Now1.getTime();
	if((chapter1.value >= 1) && (chapter1.value <= 100)) {
	    localStorage.setItem("Chinese-everyday", chapter1);
	    localStorage.setItem("Chinese-savedtime", now1);
	}
}

function linkunreaded(remaind1, bn1, cn1){
	everyday_chapter1 = document.getElementById("Chinese-everyday");
	everyday_chapter1.value = remaind1;
	autos = document.getElementById("auto1");
	autos.checked = true;
	setchap1(Reading, '', bn1, cn1);
}

function countchapter() {
        var i,j,k,txt, current_length, bnum1, cnum1, bnum2, cnum2, previous_length;
	var outfield = document.getElementById('plan');
	var unreadday = 0, dd;
	
	process_percentage();
	if (localStorage.getItem("C-ver075-start1") != null)
		start1 = localStorage.getItem("C-ver075-start1");
	if (localStorage.getItem("C-ver075-duration") != null)
		duration = localStorage.getItem("C-ver075-duration");

	var time1 = new Date();

	days = Math.ceil(duration/86400000);
//	temp1_1 = document.getElementById("test");
//	temp1_1.innerHTML = "days=" + days + "<br />\n";

//	day_length = total_length / days;
	previous_length = current_length = 0;
	j = 0;
	for(i = book_chapters[begin2];i < book_chapters[end2+1];i++){
	  if(current_length >= total_length / days *j){
//	     plan_number = 'C1-Plan-' + Number(j);
//	     localStorage.setItem(plan_number, i);
	     day_plan[j++] = i;
	  }
	  current_length += chapter_length[i];
	}
//	day_plan[j] = total_chapter_num;
	day_plan[j] = book_chapters[begin2] + total_chapter_num;
	
	for(i = book_chapters[begin2];i < book_chapters[end2+1];i++)
	  if(readedchapter[i] != 1){
		firstunreaded = i;
		break;
	  }

	for(i = 0;i < days;i++)
	  if(day_plan[i] >= firstunreaded){
	    unreadday = i;
	    break;
	  }
	  
	outfield.innerHTML = '';
	bnum1 = cnum1 = 0;
	k = 0;//k 代表目前到哪一卷書
	dd = unreadday + 5;
	if(days < dd) 
		dd = days;
	for(i = 0;i < dd;i++){
//	for(i = 0;i < unreadday+5;i++){
//	for(i = 0;i < days;i++){
	    k1 = k;
	    while(book_chapters[k+1] < day_plan[i+1])
	      k++;
	    bnum2 = k;
	    cnum2 = day_plan[i+1] - book_chapters[k] - 1;
	    time1.setTime(Number(start1) +( i+1)*86400000);
	    date1 = time1.toISOString().substr(0, time1.toISOString().indexOf("T"));
	    if(day_plan[i+1] > firstunreaded) {
//	    outfield.innerHTML += "i=" + i +" " + ",day_plan[i+1]=" + day_plan[i+1];
	      if(day_plan[i] <= firstunreaded){
		while(book_chapters[k1+1] <= firstunreaded)
		  k1++;		
//		linkunreaded(day_plan[i+1] - firstunreaded, k1, firstunreaded - book_chapters[k] - 1);
//		outfield.innerHTML += 'firstunreaded=' + firstunreaded + 'book_chapters[k1]='+ book_chapters[k1] + '<br>\n';

		if(cnums[k1] > 1)
		  outfield.innerHTML += date1 + '\t' + '<a href="" onClick="linkunreaded(' + Number(day_plan[i+1] - firstunreaded) + ',' + k1 + ',' + Number(firstunreaded - book_chapters[k1]) + '); return false;">' + simplebooks[k1] + Number(firstunreaded - book_chapters[k1]+1) + '</a>-';
//		  outfield.innerHTML += simplebooks[bnum1] + Number(cnum1+1) + '</a>-';
		else
		  outfield.innerHTML += date1 + '\t' + '<a href="" onClick="linkunreaded(' + Number(day_plan[i+1] - firstunreaded) + ',' + k1 + ',' + Number(firstunreaded - book_chapters[k1] - 1) + '); return false;">' + simplebooks[k1] + '</a>-';
//		  outfield.innerHTML += simplebooks[bnum1] + '</a>-';
		if(cnums[bnum2] > 1)
		  outfield.innerHTML += simplebooks[bnum2] + Number(cnum2+1) + '<br />\n';
		else
		  outfield.innerHTML += simplebooks[bnum2] + '<br />\n';
	      } else {
		if(cnums[bnum1] > 1)
		  outfield.innerHTML += date1 + '\t' + simplebooks[bnum1] + Number(cnum1+1) + '-';
		else
		  outfield.innerHTML += date1 + '\t' + simplebooks[bnum1] + '-';
		if(cnums[bnum2] > 1)
		  outfield.innerHTML += simplebooks[bnum2] + Number(cnum2+1) + '<br />\n';
		else
		  outfield.innerHTML += simplebooks[bnum2] + '<br />\n';
//		outfield.innerHTML += "spring註-firstunreaded=" + firstunreaded + ", i=" + i + ",day_plan[i]=" + day_plan[i] + ",day_plan[i+1]=" + day_plan[i+1] + ",days=" + Number(days) + "<br />\n";
	      }
	    }
	    
	    if(day_plan[i+1] >= book_chapters[k+1]){
	      bnum1 = bnum2+1;
	      cnum1 = 0;
	    } else {
	      bnum1 = bnum2;
	      cnum1 = cnum2 + 1;
	    }
	}
}
