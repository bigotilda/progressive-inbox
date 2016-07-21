
(function() {
  'use strict';

  // Insert injected messages here


  var app = {
    isLoading: true,
    loadedMessages: {},
    spinner: document.querySelector('.loader'),
    messageContent: document.querySelector('.messageContent'),
    messageBodyTemplate: document.querySelector('#messageBodyTemplate').content.querySelector('div'),
    messageList: document.querySelector('.messageList'),
    messageListItemTemplate: document.querySelector('.messageListItemTemplate'),
    main: document.querySelector('main'),
    messages: null,
    addDialog: document.querySelector('.dialog-container')
  };


  /*****************************************************************************
   *
   * Event listeners for UI elements
   *
   ****************************************************************************/

  // Open/show the clicked message
  app.messageList.addEventListener('click', function(e) {

    var existingMsg = app.messageContent.querySelector('div.messageBodyInstance');
    var key = e.target.closest('li').getAttribute('data-key');
    var msg = app.messages.filter(function (m) {
      return m.key === key;
    })[0];
    var msgCard = app.messageBodyTemplate.cloneNode(true);
    var btn;
    var menu;

    msgCard.classList.add('messageBodyInstance');
    msgCard.querySelector('.messageSubject').textContent = msg.subject;
    msgCard.querySelector('.messageBody').textContent = msg.body;
    btn = msgCard.querySelector('div.mdl-card__menu button');
    btn.setAttribute('id', 'key' + msg.key);

    menu = msgCard.querySelector('div.mdl-card__menu ul');
    menu.setAttribute('for', 'key' + msg.key);

    if (existingMsg) {
      app.messageContent.replaceChild(msgCard, existingMsg);
    } else {
      app.messageContent.appendChild(msgCard);
    }
    componentHandler.upgradeElement(btn);
    componentHandler.upgradeElement(menu);

    console.log('clicked on message entry...');
    console.log('key: ', key);

  });
  //document.getElementById('add').addEventListener('click', function() {
  //  // Open/show the add new message dialog
  //  console.log('showing dialog');
  //  app.toggleAddDialog(true);
  //});
  //
  //document.getElementById('butAddCancel').addEventListener('click', function() {
  //  // Close the add new message dialog
  //  app.toggleAddDialog(false);
  //});


  /*****************************************************************************
   *
   * Methods to update/refresh the UI
   *
   ****************************************************************************/

  // Toggles the visibility of the add new message dialog.
  app.toggleAddDialog = function(visible) {
    if (visible) {
      app.addDialog.classList.add('dialog-container--visible');
    } else {
      app.addDialog.classList.remove('dialog-container--visible');
    }
  };

  // Updates a message card with the specified data. If the card
  // doesn't already exist, it's cloned from the template.
  app.updateMessageCard = function(data) {
    var msg = app.loadedMessages[data.key];
    if (!msg) {
      msg = app.messageTemplate.cloneNode(true);
      msg.classList.remove('messageTemplate');
      msg.querySelector('.messageSubject').textContent = data.subject;
      msg.removeAttribute('hidden');
      app.container.appendChild(msg);
      app.loadedMessages[data.key] = msg;
    }
    msg.querySelector('.messageBody').textContent = data.body;
    //card.querySelector('.date').textContent =
    //  new Date(data.currently.time * 1000);
    //card.querySelector('.current .icon').classList.add(data.currently.icon);
    //card.querySelector('.current .temperature .value').textContent =
    //  Math.round(data.currently.temperature);
    //card.querySelector('.current .feels-like .value').textContent =
    //  Math.round(data.currently.apparentTemperature);
    //card.querySelector('.current .precip').textContent =
    //  Math.round(data.currently.precipProbability * 100) + '%';
    //card.querySelector('.current .humidity').textContent =
    //  Math.round(data.currently.humidity * 100) + '%';
    //card.querySelector('.current .wind .value').textContent =
    //  Math.round(data.currently.windSpeed);
    //card.querySelector('.current .wind .direction').textContent =
    //  data.currently.windBearing;
    //var nextDays = card.querySelectorAll('.future .oneday');
    //var today = new Date();
    //today = today.getDay();
    //for (var i = 0; i < 7; i++) {
    //  var nextDay = nextDays[i];
    //  var daily = data.daily.data[i];
    //  if (daily && nextDay) {
    //    nextDay.querySelector('.date').textContent =
    //      app.daysOfWeek[(i + today) % 7];
    //    nextDay.querySelector('.icon').classList.add(daily.icon);
    //    nextDay.querySelector('.temp-high .value').textContent =
    //      Math.round(daily.temperatureMax);
    //    nextDay.querySelector('.temp-low .value').textContent =
    //      Math.round(daily.temperatureMin);
    //  }
    //}
    if (app.isLoading) {
      app.spinner.setAttribute('hidden', true);
      app.main.removeAttribute('hidden');
      app.isLoading = false;
    }
  };


  /*****************************************************************************
   *
   * Methods for dealing with the model
   *
   ****************************************************************************/

  // Gets a forecast for a specific city and update the card with the data
  //app.getForecast = function(key, label) {
  //  var url = 'https://publicdata-weather.firebaseio.com/';
  //  url += key + '.json';
  //  // Make the XHR to get the data, then update the card
  //  var request = new XMLHttpRequest();
  //  request.onreadystatechange = function() {
  //    if (request.readyState === XMLHttpRequest.DONE) {
  //      if (request.status === 200) {
  //        var response = JSON.parse(request.response);
  //        response.key = key;
  //        response.label = label;
  //        app.hasRequestPending = false;
  //        app.updateForecastCard(response);
  //      }
  //    }
  //  };
  //  request.open('GET', url);
  //  request.send();
  //};

  // Iterate all of the cards and attempt to get the latest forecast data
  //app.updateForecasts = function() {
  //  var keys = Object.keys(app.visibleCards);
  //  keys.forEach(function(key) {
  //    app.getForecast(key);
  //  });
  //};

  var initMessageData = [
    {
      key: '1',
      subject: 'Pied Piper beta invite',
      body: 'You can totally have one of my invites. In A.D. 2101, war was beginning. Captain: What happen? Mechanic: Somebody set us up the bomb.',
      from: 'Dinesh'
    },
    {
      key: '2',
      subject: 'Enlarge your brain by 3 inches',
      body: 'With this pills unapproved by the FDA! You have no chance to survive make your time.',
      from: 'LegitimateBusinessman'
    },
    {
      key: '3',
      subject: 'FW: Hot internet garbage',
      body: 'something something something memes. Takeoff every ZIG for great justice!',
      from: 'Redditor'
    },
    {
      key: '4',
      subject: 'Pure junk',
      body: 'Uhhhhhhh All your base are belong to us.',
      from: 'SpamArtist'
    }
  ];

  function saveMessages() {
    localStorage.messages = JSON.stringify(app.messages);
  }

  function updateMessageList(message) {
    var msg = app.loadedMessages[message.key];
    if (!msg) {
      msg = app.messageListItemTemplate.cloneNode(true);
      msg.classList.remove('messageListItemTemplate');
      msg.querySelector('.from').textContent = message.from;
      msg.querySelector('.subject').textContent = message.subject;
      msg.removeAttribute('hidden');
      msg.setAttribute('data-key', message.key);
      app.messageList.appendChild(msg);
      app.loadedMessages[message.key] = msg;
    }

    if (app.isLoading) {
      app.spinner.setAttribute('hidden', true);
      app.main.removeAttribute('hidden');
      app.isLoading = false;
    }
  }

  // use either injected initial messages or localStorage
  app.messages = localStorage.messages;
  if (app.messages) {
    app.messages = JSON.parse(app.messages);
    app.messages.forEach(updateMessageList);
  } else {
    initMessageData.forEach(updateMessageList);
    app.messages = initMessageData;
    saveMessages();
  }

})();
