var events = [
  {
    start: 30,
    end: 150
  },
  {
    start: 540,
    end: 600
  },
  {
    start: 560,
    end: 620
  },
  {
    start: 610,
    end: 670
  }
]

function findFirstConflict(block_start_index, temp, curr_event_index, width) {
    var first_empty_block = -1;
    var conflict = false;
	var track = width;
    for (i = block_start_index; i < curr_event_index; i++) {
        if (temp[i].end <= temp[curr_event_index].start && track > 0) {
            if (first_empty_block == -1) {
                first_empty_block = i;
            }
        }
        if (temp[i].end > temp[curr_event_index].start) {
            conflict = true;
        }
		track = track - 1;
    }
    if (conflict && first_empty_block == -1)
        return curr_event_index; //conflict exist, no empty block, need to reduce width of all divs in block
    if (!conflict)
        return -1; //start new block, no conflict
    else
        return first_empty_block; //space for div under event at this index
}

function layOutDay(events) {
    var er = false;
    events.forEach(function(event_entry) {
        if (event_entry.start > event_entry.end) {
            console.log("invalid event detected.");
            er = true;
        }
        if (event_entry.start < -1) {
            console.log("invalid event detected.");
            er = true;
        }
        if (event_entry.end > 720) {
            console.log("invalid event detected.");
            er = true;
        }
    });
    if (er)
        return;
    var temp = events.slice(0);
    temp.sort(function(a, b) { //sort by start time
        if (a.start == b.start) {
            return a.end - b.end;
        }
        return a.start - b.start;
    });
    var block_start = 0;
	var width = 0;
    for (i = 0; i < temp.length; i++) {
        var res = findFirstConflict(block_start, temp, i, width);
        if (res == -1) //start new block
        {
            temp[i].x1 = 0;
            temp[i].conflicts = 0;
            block_start = i;
			width = 1;
        } else if (res == i) { //conflict exist, no empty block, need to reduce width of all divs in block
            var update_conflicts = temp[block_start].conflicts + 1;
            for (j = block_start; j <= i; j++) {
                temp[j].conflicts = update_conflicts;
            }
            temp[i].x1 = width;
			width = width + 1;
        } else { //space for div under event at res
            temp[i].x1 = temp[res].x1;
            temp[i].conflicts = temp[res].conflicts;

            //swap temp[i] and temp[res], higher level events take precedence when first match
            var s = temp[res];
            temp[res] = temp[i];
            temp[i] = s;
        }
    }

    $(document).ready(function() {
        temp.forEach(function(event_entry) {
            $('#calendar').append('<div class="event" style="background-color:white; height: ' + (event_entry.end - event_entry.start) + 'px; width: ' + 600 / (event_entry.conflicts + 1) + 'px; margin-left: ' + (600 / (event_entry.conflicts + 1) * event_entry.x1) + 'px; margin-top: ' + event_entry.start + 'px"><div class="inner"></div><div class="inner-left"><div><p style="color: #5576ad; font-size: 75%;"><b>Sample Item</b></p></div><font>Sample Location</font></div>');
        });
    });
    return 0;
}