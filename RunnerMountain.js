
var firstFlg = true;

var prev_lat = 0;
var prev_lon = 0;

var runPt = 0;
var keisokuFlg = false;

if(localStorage.getItem('runPt') != null){
	runPt = Number(localStorage.getItem('runPt'));
}

//runPt = 900;

var allHanaDict = {}

/*
allHanaDict["アイ"] = "https://minhana.net/wiki/%e3%82%a2%e3%82%a4%ef%bc%88%e3%82%bf%e3%83%87%e3%82%a2%e3%82%a4%ef%bc%89/"
*/


var detectedHanaDict = {}



var MountainHanaDict = {}



if(localStorage.getItem('saveData') != null){
	detectedHanaDict = JSON.parse(localStorage.getItem('saveData'));
	
}else{
	initDetectedHanaDict();
	
}

if(localStorage.getItem('allHanaDict') == null){
	initHanaDict();
}else{
	allHanaDict = JSON.parse(localStorage.getItem('allHanaDict'));
}

if(localStorage.getItem('MountainHanaDict') == null){
	initMountainHanaDict()
}else{
	MountainHanaDict = JSON.parse(localStorage.getItem('MountainHanaDict'));
}

function initDetectedHanaDict(){
detectedHanaDict["アイ"] = false;
detectedHanaDict["アイスランドポピー"] = false;
detectedHanaDict["アグロステンマ"] = false;
detectedHanaDict["アイイロニワゼキショウ"] = false; 
detectedHanaDict["アイズシモツケ"] = false; 
detectedHanaDict["アオキ"] = false; 
detectedHanaDict["アオギリ"] = false; 
detectedHanaDict["アオチドリ"] = false; 
detectedHanaDict["アオテンナンショウ"] = false;

}

function clearStorage(){
	flg1 = confirm('本にデータを初期化しますか?');
	
	if(flg1 == true){
		localStorage.clear();
		alert('データを初期化しました');
	}else{
		return;
	}
}



function initHanaDict(){
	/* これでもOK */
	allHanaDict["アイ"] = "https://minhana.net/wiki/アイ（タデアイ）"
	allHanaDict["アイスランドポピー"] = "https://minhana.net/wiki/%e3%82%a2%e3%82%a4%e3%82%b9%e3%83%a9%e3%83%b3%e3%83%89%e3%83%9d%e3%83%94%e3%83%bc%ef%bc%88%e3%82%b7%e3%83%99%e3%83%aa%e3%82%a2%e3%83%92%e3%83%8a%e3%82%b2%e3%82%b7%ef%bc%89/";
	allHanaDict["アグロステンマ"] = "https://minhana.net/wiki/%e3%82%a2%e3%82%b0%e3%83%ad%e3%82%b9%e3%83%86%e3%83%b3%e3%83%9e%ef%bc%88%e3%83%a0%e3%82%ae%e3%83%8a%e3%83%87%e3%82%b7%e3%82%b3%ef%bc%89/";
	allHanaDict["アイイロニワゼキショウ"] = "https://minhana.net/wiki/%e3%82%a2%e3%82%a4%e3%82%a4%e3%83%ad%e3%83%8b%e3%83%af%e3%82%bc%e3%82%ad%e3%82%b7%e3%83%a7%e3%82%a6/";
	allHanaDict["アイズシモツケ"] = "https://minhana.net/wiki/%e3%82%a2%e3%82%a4%e3%82%ba%e3%82%b7%e3%83%a2%e3%83%84%e3%82%b1/";
	allHanaDict["アオキ"] = "https://minhana.net/wiki/%e3%82%a2%e3%82%aa%e3%82%ad/";
	allHanaDict["アオギリ"] = "https://minhana.net/wiki/%e3%82%a2%e3%82%aa%e3%82%ae%e3%83%aa/";
	allHanaDict["アオチドリ"] = "https://minhana.net/wiki/%e3%82%a2%e3%82%aa%e3%83%81%e3%83%89%e3%83%aa%ef%bc%88%e3%83%8d%e3%83%a0%e3%83%ad%e3%83%81%e3%83%89%e3%83%aa%ef%bc%89/";
	allHanaDict["アオテンナンショウ"] = "https://minhana.net/wiki/%e3%82%a2%e3%82%aa%e3%83%86%e3%83%b3%e3%83%8a%e3%83%b3%e3%82%b7%e3%83%a7%e3%82%a6/";
	
	localStorage.setItem('allHanaDict', JSON.stringify(allHanaDict));
}

function initMountainHanaDict(){
	MountainHanaDict["A山"] = ["アイ", "アイスランドポピー", "アグロステンマ"]
	MountainHanaDict["B山"] = ["アイイロニワゼキショウ", "アイズシモツケ", "アオキ"]
	MountainHanaDict["C山"] = ["アオギリ", "アオチドリ", "アオテンナンショウ"]


	localStorage.setItem('MountainHanaDict', JSON.stringify(MountainHanaDict));

}


function writeKeisokuFlg(){

	span1 = document.getElementById("KeisokuFlg1");
	
	if(keisokuFlg == true){
		span1.innerHTML = "計測中";
	}else{
		span1.innerHTML = "--"
	}

}

function UseRunPt(){

	if(runPt < 30){
		return;
	}

	runPt = runPt - 30;
	MountainName = document.getElementById("MountainNames").value;
	
	HanaList = MountainHanaDict[MountainName];
	hana1 = HanaList[Math.floor(Math.random()*HanaList.length)];
	detectedHanaDict[hana1] = true;
	localStorage.setItem('saveData', JSON.stringify(detectedHanaDict));
	
	
	spanElem = document.getElementById("detecteHana1");
	URL1 = allHanaDict[hana1];
	spanElem.innerHTML = "<a href=\"" + URL1 + "\"" + "  target=\"_blank\" >" + hana1 + "</a>";
	
	writeRunPt();
	
}
function countDetectedHana(){

	ret = 0;
	
	keys = Object.keys(detectedHanaDict);
	for(key of keys){
		if(detectedHanaDict[key] == true){
			ret++;
		}
	}
	
	return ret;
}

function showHanaZukan(){

	hanaZukanH2 = document.getElementById("hanaZukan1");

	str1 = ""
	
	detectHanaCount = countDetectedHana();
	elem1 = document.getElementById("detectedHanaCount1")
	elem1.innerHTML = detectHanaCount
	
	keys = Object.keys(allHanaDict);
	keys.sort();
	
	for(key of keys){
		if(detectedHanaDict[key] == true){
			str1 +=  "<a href=\"" + allHanaDict[key] + "\">" + key +"</a><br>"
		}else{
			str1 += "？<br>"
		}
	}
	
	hanaZukanH2.innerHTML = str1
	
	
}



function changeTab(link){
  var id = link.hash.slice(1);
  var page = document.getElementById(id);

    current.page.style.display = 'none';
    if(current.menu != null){
	    current.menu.className = '';
	}
    page.style.display = 'block';
    link.className = 'active';
    current.page = page;
    current.menu = link;
    
}

var current; // 現在のタブの状態を保持する変数

//タブのリンク一覧
var Tablinks = [];


(function(){
var menu = document.getElementById('tab_menu1');
var content = document.getElementById('tab_content1');
var links = menu.getElementsByTagName('a');


//Tablinkのリスト取得
for (var i = 0, l = links.length;i < l; i++){
  if(links[i].className == 'Tablink'){
  	Tablinks.push(links[i]);
  }
}
//各タブの初期化
for (var j = 0;j < Tablinks.length; j++){
  tab_init(Tablinks[j], j);
}
function tab_init(link, index){
  var id = link.hash.slice(1);
  var page = document.getElementById(id);
  if (!current){ // 状態の初期化
    current = {page:page, menu:link};
    page.style.display = 'block';
    link.className = 'active';
  } else {
    page.style.display = 'none';
  }
  
  
  if(id == 'pageUseRunPt'){//ランポイント使用タブの初期表示メソッド
  	  link.onclick = function(){
  	  	changeTab(link);
  	  	
		writeRunPt();
		
  	  	
  	  	return false;

  	  }
  }else if(id == 'pageHanaZukan'){//花図鑑タブの初期表示メソッド
	  link.onclick = function(){
		  	changeTab(link);

			showHanaZukan();
			
			return false;
		};
  }else if(id == 'pageClearStorage'){//データを初期化タブの初期表示メソッド
  	  link.onclick = function(){
		  	changeTab(link);
			
			return false;
		};
  }
  
}
})();




function keisoku() {
    navigator.geolocation.getCurrentPosition(test2);
}

function startKeisoku(){
	keisokuFlg = true;
	writeKeisokuFlg();
	keisoku();
}

function stopKeisoku(){
	keisokuFlg = false;
	writeKeisokuFlg();
	
}





function writeRunPt(){
	span1 = document.getElementById("RunPt1");
	span1.innerHTML = runPt;
}
function test2(position) {

	lat2 = position.coords.latitude
	lon2 = position.coords.longitude
	
    var geo_text = "緯度:" + position.coords.latitude + "\n";
    geo_text += "経度:" + position.coords.longitude + "\n";
    geo_text += "高度:" + position.coords.altitude + "\n";
    geo_text += "位置精度:" + position.coords.accuracy + "\n";
    geo_text += "高度精度:" + position.coords.altitudeAccuracy  + "\n";
    geo_text += "移動方向:" + position.coords.heading + "\n";
    geo_text += "速度:" + position.coords.speed + "\n";
    geo_text += "prev_lat:" + prev_lat + "\n";
    geo_text += "prev_lon:" + prev_lon + "\n";

    var date = new Date(position.timestamp);

    geo_text += "取得時刻:" + date.toLocaleString() + "\n";


    var dist1 = 0;
    if(firstFlg != true){
    	dist1 = distance(prev_lat, prev_lon, lat2, lon2)
    	
    }else{
    	firstFlg = false;
    }
    prev_lat = lat2;
    prev_lon = lon2;
    
    geo_text += "移動距離:" + dist1 + "メートル \n";
    /* alert(geo_text); */
    
    
    if(dist1 >= 100 && dist1 <= 500){
    	runPt = runPt + 1;
    	localStorage.setItem('runPt', String(runPt));
    }
    writeRunPt()
    
    if(keisokuFlg == true){
    	setTimeout("keisoku()", 60000)
	}
}

function deg2rad(degrees) {
  return degrees * Math.PI / 180;
};

function rad2deg(radian){
        return radian * 360/(2*Math.PI);
}

/**
 * ２地点間の距離(m)を求める
 * ヒュベニの公式から求めるバージョン
 *
 * @param float $lat1 緯度１
 * @param float $lon1 経度１
 * @param float $lat2 緯度２
 * @param float $lon2 経度２
 * @param boolean $mode 測地系 true:世界(default) false:日本
 * @return float 距離(m)
 */
function distance($lat1, $lon1, $lat2, $lon2, $mode=true)
{
    // 緯度経度をラジアンに変換
    $radLat1 = deg2rad($lat1); // 緯度１
    $radLon1 = deg2rad($lon1); // 経度１
    $radLat2 = deg2rad($lat2); // 緯度２
    $radLon2 = deg2rad($lon2); // 経度２

    // 緯度差
    $radLatDiff = $radLat1 - $radLat2;

    // 経度差算
    $radLonDiff = $radLon1 - $radLon2;

    // 平均緯度
    $radLatAve = ($radLat1 + $radLat2) / 2.0;

    // 測地系による値の違い
    $a = $mode ? 6378137.0 : 6377397.155; // 赤道半径
    $b = $mode ? 6356752.314140356 : 6356078.963; // 極半径
    //$e2 = ($a*$a - $b*$b) / ($a*$a);
    $e2 = $mode ? 0.00669438002301188 : 0.00667436061028297; // 第一離心率^2
    //$a1e2 = $a * (1 - $e2);
    $a1e2 = $mode ? 6335439.32708317 : 6334832.10663254; // 赤道上の子午線曲率半径

    $sinLat = Math.sin($radLatAve);
    $W2 = 1.0 - $e2 * ($sinLat*$sinLat);
    $M = $a1e2 / (Math.sqrt($W2)*$W2); // 子午線曲率半径M
    $N = $a / Math.sqrt($W2); // 卯酉線曲率半径

    $t1 = $M * $radLatDiff;
    $t2 = $N * Math.cos($radLatAve) * $radLonDiff;
    $dist = Math.sqrt(($t1*$t1) + ($t2*$t2));

    return $dist;
}