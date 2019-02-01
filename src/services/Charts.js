import zingchart from 'zingchart'

class Charts {
  /**
   * Creates chart of given type based on the options object passed into.
   *
   * @param {Number} destinationId - id of HTML element where to put the chart
   * @param {Object} options - title, type, values, xlabels
   */
  createChart (destinationId, options) {
    zingchart.render({
      width: '94%',
      id: destinationId,
      data: {
        type: options.type,
        title: {
          text: options.title
        },
        plot: {
          'value-box': {
            text: '%v ' + options.valueAppend
          },
          tooltip: {
            text: '%kt - %v ' + options.tooltipAppend
          }
        },
        'scale-x': {
          visible: false,
          labels: options.xLabels
        },
        series: [{
          values: options.values
        }]
      }
    })
  }
}

export default new Charts()
