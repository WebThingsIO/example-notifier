const {
  Constants,
  Notifier,
  Outlet,
} = require('gateway-addon');

/**
 * An example outlet
 */
class ExampleOutlet extends Outlet {
  /**
   * @param {ExampleNotifier} notifier
   * @param {string} id - A globally unique identifier
   */
  constructor(notifier, id) {
    super(notifier, id);
    this.name = 'Example';
  }

  async notify(title, message, level) {
    let priority = '';

    switch (level) {
      case Constants.NotificationLevel.LOW:
        priority = 'LOW';
        break;
      case Constants.NotificationLevel.NORMAL:
        priority = 'NORMAL';
        break;
      case Constants.NotificationLevel.HIGH:
        priority = 'HIGH';
        break;
    }

    console.log('===== NEW NOTIFICATION =====');
    console.log('Priority:', priority);
    console.log('   Title:', title);
    console.log(' Message:', message);
  }
}

/**
 * Example Notifier
 *
 * Instantiates one example outlet
 */
class ExampleNotifier extends Notifier {
  constructor(addonManager, manifest) {
    super(addonManager, 'example', manifest.name);

    addonManager.addNotifier(this);

    if (!this.outlets['example-0']) {
      this.handleOutletAdded(new ExampleOutlet(this, 'example-0'));
    }
  }
}

module.exports = ExampleNotifier;
