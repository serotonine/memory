
app.factory ('memoryFactory', function ($http, $q, $rootScope, utilsFactory ){

  var that={ "data":null };
  that.get= function() {

    var deffered = $q.defer();

    $http({

      url:'data/memory-list.json',
      method:'POST',
      headers:{ 'Content-Type':'json' },
      cache : true
    })
    .success(function(data){

      deffered.resolve(data);
    })
    .error(function(textStatus){

      deffered.reject(textStatus);
    });
    return deffered.promise;
  } //end that.get

  that.prepareCart = function(list, level){

    var getRandomIndex= function(lg){ return Math.floor(Math.random() * (lg)) ; };

    var mix=function(tab, lg){
      var output=[],
      temp = tab.map(function(el, id){ return el; });
      // console.log("temp =" + temp);
      while(output.length<lg){

        var i = getRandomIndex(temp.length);
        //  console.log("i =" + i);
        var t =temp.splice(i,1);
        //  console.log(t[0]);
        output.push(t[0]);
        //  console.log(output);

      }
      //  console.log("is array ? = "+ Array.prototype.isPrototypeOf(output));
      return output;
    }
    var temp1 = mix(list, level/2);


    var temp2 = mix(temp1, level/2);
    return output = mix(temp1.concat(temp2),level);


  }//end prepareCart

  // USER //
  that.user = {
    init:function(){

      if(!$rootScope.hasOwnProperty('user')){
        if(utilsFactory.LocalStorageUI.getData('user')){
          $rootScope.user = utilsFactory.LocalStorageUI.getData('user');
        }//end getData from localStorage
        else{
          $rootScope.user = {};
          $rootScope.user.scores =[];
          $rootScope.user.pseudo=null;
          utilsFactory.LocalStorageUI.setData('user',$rootScope.user); }
        }

        else{

            if(utilsFactory.LocalStorageUI.getData('user')){
              $rootScope.user = utilsFactory.LocalStorageUI.getData('user');
            }//end getData from localStorage
        }
      },//init

      setPseudo:function(nickname){

        if($rootScope.hasOwnProperty('user')){
          if($rootScope.user.hasOwnProperty('pseudo')){
            $rootScope.user.pseudo= nickname;
            return true;
          }
        }//end if
        else{
          if(utilsFactory.LocalStorageUI.getData('user')){
            $rootScope.user = utilsFactory.LocalStorageUI.getData('user');
            $rootScope.user.pseudo= nickname;
            utilsFactory.LocalStorageUI.setData('user',$rootScope.user);
            return true;
          }//end if in else
          else { memoryFactory.user.init(); }

        }//end else
      }, // end setPseudo

      addScore: function(obj){

        if(!utilsFactory.LocalStorageUI.getData('user')){ that.user.init();  }

        var temp = utilsFactory.LocalStorageUI.getData('user');
        temp.scores.push(obj);
        utilsFactory.LocalStorageUI.setData('user',temp);

        return true;
      },//end add score


      getScores:function(){
        if(utilsFactory.LocalStorageUI.getData('user')){
          return utilsFactory.LocalStorageUI.getData('user').scores;


        }
        else{ throw( "ya une couille dans le potage"); }
      }//end getScores
    };//end that.user


    //get date
    that.getDate= function(){
      var today = new Date(),
      mn = today.getMinutes(),
      hh = today.getHours(),
      dd = today.getDate(),
      mm = today.getMonth()+1,
      yyyy = today.getFullYear();
      return dd+"/"+mm+"/"+yyyy+" "+hh+"h:"+mn;

    }

    return that;

  }); //end memoryfactory


  app.factory('utilsFactory', function(){
    var that={};
    //LOCAL STORAGE //
    that.LocalStorageUI = {

      getData: function(item){

        if(localStorage !== undefined){

          if(localStorage.getItem(item)!== null){ return JSON.parse(localStorage.getItem(item));  }
          else{ return false; }
        }
        else{ throw "localStorage is not a valid method"; }

      },

      setData : function(item, data){

        if(localStorage !== undefined){
          app.currentList = data;
          localStorage.setItem( item,JSON.stringify(data) ) ;
        }
        else{ throw "localStorage is not a valid method"; }

      }

    }// end LocalStorageUI

    return that;



  });
