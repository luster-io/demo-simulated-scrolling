var Physics = require('impulse')
  , listContainer = document.querySelector('.messages')
  , height = window.innerHeight
  , boundry = new Physics.Boundry({
  top: -($(listContainer).height() - window.innerHeight + 43),
  bottom: 0,
  left: 0,
  right: 0
})

var scroller = new Physics(listContainer)
  .style('translateY', function(x, y) { return y + 'px' })
var drag = scroller.drag({ boundry: boundry, direction: 'vertical', damping: 0.5 })

drag.on('end', function(evt) {
  var position = scroller.position().y

  if(scroller.direction('up') || position < boundry.top)
    end = { x: 0, y: boundry.top }
  else if(scroller.direction('down') || position > boundry.bottom)
    end = { x: 0, y: boundry.bottom }

  if(end) {
    if(boundry.contains({ x: 0, y: position })) {
      scroller.decelerate({ deceleration: 2000 }).to(end).start()
        .then(scroller.spring({ tension: 120, damping: 24 }).start)
    } else {
      scroller.spring({ tension: 150, damping: 24 }).to(end).start()
    }
  }
})