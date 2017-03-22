var downloadFilesModel = (function downloadFilesModel(){
	// var urls = [];
	var file, fileData, basePath;

	var myData = [];
	var file = "file.csv";
	var realPath;
	elem = [];
	// var realPath = this.getFolderPath();
	var start = function(){
		if(checkParameters()){
			//alert('Nothing is missing!');
			var arrayUrlAssets = prepareUrlAssets();
			var arrayHtmlElements = prepareHtmlElements(arrayUrlAssets);

		} else {
			alert('Something is missing!');
		}
	}

	var checkParameters = function (){
		var checked = false;
	 	file = document.getElementById("fileCSV").value;
		basePath = document.getElementById("folder-path").value;
		if((file !== "" && file !== undefined) && (basePath!== "" && basePath !== undefined)){
			checked = true;
		}
		return checked;
	}

	var prepareUrlAssets = function(){
		//tendrias que llamar a una funcion para comprobar si la url es valida
		// y guardar la url comprobada 
		var finalBaseURL = basePath;
		var arrayAssets = getAssetsArray();
		return arrayAssets.map(function(val){
			return finalBaseURL + val;
		});		
	}
		
	var getAssetsArray = function(){
		var data = fileData;
		var dirtyData = data.split('\n');

		var newArray = dirtyData.map(function(val){
		 	var num=val.lastIndexOf(",");
			var title=val.substring(0,num) 
			return title;
		})
		return newArray;
  	};

    var prepareHtmlElements = function (arr){	
		for(i=0; i<arr.length; i++){
			elem.push($("<a>").attr("href", arr[i]).attr("download", "img.png", "img.jpg").appendTo("body"))
		}	
	console.log(elem);	
	}


	var setFileData = function(data){
		fileData = data;
	}

	var downloadFiles =  function (){
		for(i=0;i<elem.length;i++){
			elem[i][0].click();
		}
	}
	var removeAll = function (){
		for(i=0;i<elem.length;i++){
			elem[i].remove();
		}
	}

	return{
		downloadFiles : downloadFiles,
		removeAll : removeAll,
		setFileData : setFileData,
		start : start
	};
})();


document.getElementById('fileCSV').addEventListener('change', handleFileSelect, false);

function handleFileSelect(event){
	var file = event.target.files[0];
	var reader = new FileReader();
	reader.onload = function(event) {
		downloadFilesModel.setFileData(event.target.result);
	};
	reader.readAsText(file);
}


function download(){
	downloadFilesModel.start();	
	downloadFilesModel.downloadFiles();	
	downloadFilesModel.removeAll();
}
