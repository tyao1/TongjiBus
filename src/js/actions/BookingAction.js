var AppDispatcher = require('../dispatchers/AppDispatcher');
var BookingConstants = require('../constants/BookingConstants');
var request = require('superagent');


var BookingAction={

  //start login
  login:function(credential){
    AppDispatcher.handleViewAction({
      type:BookingConstants.SAVECREDENTIAL,
      credential:credential
    });

    request.get('http://jiading.tongji.edu.cn:8080/TJbus/LoginServlet')
      .query(credential)
      .end(function(res){
        if(res.ok)
        {
          AppDispatcher.handleServerAction({
            type:BookingConstants.LOGIN_SUCCESS,
            text:res.text
          });
        }
        else
        {
          AppDispatcher.handleServerAction({
            type:BookingConstants.LOGIN_FAILURE
          });
        }

    });
  },

  changeView:function(index){
    AppDispatcher.handleViewAction({
      type:BookingConstants.CHANGE_VIEW,
      index
    });
  },

  loadHistoryList:function(username){
    AppDispatcher.handleServerAction({
      type:BookingConstants.GETHISTORYTICKETS_START
    });

    request.get('http://jiading.tongji.edu.cn:8080/TJbus/TicketServlet')
      .query({
        username,
        curtime:Date.now(),//new Date().getTime(),
        history:1
      })
      .end(function(res){
        if(res.ok)
        {
          AppDispatcher.handleServerAction({
            type:BookingConstants.GETHISTORYTICKETS_SUCCESS,
            data:JSON.parse(res.text)
          });
        }
        else
        {
          AppDispatcher.handleServerAction({
            type:BookingConstants.GETHISTORYTICKETS_FAILURE
          });
        }

      });
  },
  loadMyList:function(username){
    AppDispatcher.handleServerAction({
      type:BookingConstants.GETMYTICKETS_START
    });

    request.get('http://jiading.tongji.edu.cn:8080/TJbus/TicketServlet')
      .query({
        username,
        curtime:Date.now(),
        history:0
      })
      .end(function(res){
        if(res.ok)
        {
          AppDispatcher.handleServerAction({
            type:BookingConstants.GETMYTICKETS_SUCCESS,
            data:JSON.parse(res.text)
          });
        }
        else
        {
          AppDispatcher.handleServerAction({
            type:BookingConstants.GETMYTICKETS_FAILURE
          });
        }

      });
  },
  bookTicket:function(data){
    AppDispatcher.handleServerAction({
      type:BookingConstants.BOOK_TICKET_START
    });

    request.get('http://jiading.tongji.edu.cn:8080/TJbus/getTicketServlet')
      .query({
        username:data.username,
        get_ticket_time:Date.now(),//new Date().getTime(),
        bus_id:data.bus_id
      })
      .end(function(res){
        if(res.ok)
        {
          AppDispatcher.handleServerAction({
            type:BookingConstants.BOOK_TICKET_SUCCESS,
            data:res.text.trim()
          });
          BookingAction.loadMyList(data.username);
        }
        else
        {
          AppDispatcher.handleServerAction({
            type:BookingConstants.BOOK_TICKET_FAILURE
          });
        }
      });
  },
  initBookTicket:function(){
    AppDispatcher.handleViewAction({
      type:BookingConstants.BOOK_TICKET_INIT
    });
  },
  returnTicket:function(data){
    AppDispatcher.handleServerAction({
      type:BookingConstants.BOOK_TICKET_START
    });

    request.get('http://jiading.tongji.edu.cn:8080/TJbus/CancelTicketServlet')
      .query({
        ticket_id:data.ticket_id,
        bus_id:data.bus_id
      })
      .end(function(res){
        if(res.ok)
        {
          console.log(res.text);
          AppDispatcher.handleServerAction({
            type:BookingConstants.BOOK_TICKET_SUCCESS,
            data:res.text.trim()
          });
          BookingAction.loadMyList(data.username);
        }
        else
        {
          AppDispatcher.handleServerAction({
            type:BookingConstants.BOOK_TICKET_FAILURE
          });
        }

      });
  }

};
module.exports = BookingAction;
