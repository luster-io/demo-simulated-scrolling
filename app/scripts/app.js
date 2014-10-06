var Physics = require('impulse')
  , listContainer = document.querySelector('.container')
  , height = window.innerHeight
  , boundry = new Physics.Boundry({
  top: 0,
  bottom: (listContainer.scrollHeight),
  left: 0,
  right: 0
})

var top
  , touching = false
  , interaction
var scroller = new Physics(function(x, y) {
  console.log(y)
})

listContainer.addEventListener('touchstart', function(evt) {
  touching = true
  interaction = scroller.interact()
  interaction.start()
})

$(listContainer).scroll(function(evt) {
  top = listContainer.scrollTop
  interaction.position({ x: 0, y: top })
})

listContainer.addEventListener('touchend', function(evt) {
  touching = true
  interaction.end()

  var position = scroller.position().y
    , end

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
