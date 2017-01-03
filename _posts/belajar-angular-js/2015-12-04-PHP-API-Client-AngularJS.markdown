# PHP API Client AngularJS #


- Listing Events Docs
`/` assoc `event-list.html` and `EventListCtrl Controller`

```
var app = angular.module('EventListApp', []);
app.controller('EventListCtrl', function($scope, $location, EventService){
	EventService.query(function(evnets){
		$scope.events = events;
	});
});
...
<div ng-app="EventListApp" ng-controller="EventListCtrl">
	<ul ng-repeat="x in events">
		<li id="{{x.id}}">
			{{x.name}}
			<a href="?action=doThis&id={{x.id}}">doThis</a>
		</li>
	</ul>
</div>
```

- Create New Event

```
$scope.editEvent = function(event){
	$scope.opts = ['on', 'off'];
	if(event == 'new'){
		$scope.newEvent = true;
		$scope.event = { properties: '', arrays: [{ properties: '' }] };
	} else {
		$scope.newEvent = false;
		$scope.event = event;
	}
}
...
<form action="" method="get">
	<input type="text" name="properties" value="{{event.properties}}" placeholder="properties">
	<input type="button" name="create" value="" ng-model="create()">
	<input type="button" name="delete" value="" ng-model="delete()">
	<input type="button" name="update" value="" ng-model="update()">
</form>
```

```
// AddVoteOption
$scope.addVoteOption = function(){
	$scope.event.voteoptions.push({ properties: values });
};
// RemoveVoteOption
$scope.removeVoteOption = function(vote){
	$scope.event.voteoptions.splice(vote.id-1, 1);
	$scope.event.voteoptions.forEach(function(vo, index){
		vo.id = index +1;
	});
};
// newEvent()
var newEvent = new EventService($scope.event);
newEvent.$save(function(){
	$scope.events.push(newEvent);
});
// saveUpdate()
$scope.events.forEach(function(e){
	if(e.key === $scope.event.key){
		e.$save();
	}
});
// Delete An Event
$scope.delete = function(){
	$scope.events.forEach(function(e, index){
		if(e.key == $scope.event.key){
			$scope.event.$delete( { id: $scope.event.key, rev: $scope.event.rev,
				function(){ $scope.events.splice(index, 1);
			});
		}
	});
};
```

- Event APIs Method

```
app.get('/api/events', routes.getEventList);
getEventList = exports.getEventList = function(req, res){
	events.list(req.cookies['AuthSession'], function(err, list){
		if(err) {
			res.send(401, JSON.stringify({error: true}));
		} else {
			res.send(list);
		}
	});
}
// listing events
list = exports.list = function(cookie, callback){
	getDB(cookie).view('event', 'list', function(err, body){
		if(err) {
			console.log(err);
			callback(err);
		} else {
			var events = _und.map(body.rows, function(row) { return row.value; });
			callback(null, events);
		}
	});
}
// get an event
app.get('/api/events/:id', routes.getEventById);
// error 404
getEventById = exports.getEventById = function(req, res){
	events.findBy('all', {key: [req.params.id], reduce: false}, function(err, event){
		if(err) {
			res.send(404, 'We could not locate your event');
		} else {
			res.send(JSON.stringify(event));
		}
	});
}
// http delete method
app.delete('/api/events/:id', routes.destroyEvent);
destroyEvent = exports.destroyEvent = function(req, res){
	events.destroy(req.cookies['AuthSession'], req.params.id, req.query.rev,
	function(err, body){
		if(err){
			console.log(err);
			res.send(500, JSON.stringify({error: true}));
		} else {
			res.send(200, "OK");
		}
	});
}
destroy = exports.destroy = function(cookie, id, rev, callback){
	getDB(cookie).destroy(id, rev, function(err, body){
		callback(err, body);
	});
}
// saving event
app.post('/api/event', routes.saveEvent);
saveEvent = exports.saveEvent = function(req, res){
	events.save(req.cookies['AuthSession'], req.body,
	function(err, body){
		if(err){
			console.log(err);
			res.send(500, JSON.stringify({error: true}));
		} else {
			req.body._rev = body.rev;
			res.send(req.body);
		}
	});
}
// generate event id
save = exports.save = function(cookie, event, callback){
	if(!event._id) { event._id = 'event:' event.shortname }
		getDB(cookie).insert(event, function(err, body){
			callback(err, body);
		});
}
```

(sumber)[http://twilio-votr-part5.nodejitsu.com/]
(source code)[https://github.com/crabasa/votr-part5]
(part one)[http://www.twilio.com/blog/2012/09/building-a-real-time-sms-voting-app-part-1-node-js-couchdb.html]