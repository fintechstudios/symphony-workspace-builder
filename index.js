
export default class SymphonyWorkspaceBuilder {
  /**
   * @param {string} appId - your application's id
   * @param {Object} SYMPHONY_API - the loaded Symphony API
   * @param {string} [serviceName] - defaults to `this.appId`:wb
   * @param {string} [title] - nav name
   * @param {string} [url] - the url of your
   */
  constructor(appId, SYMPHONY_API, {
    serviceName=`${appId}:wb`,
    title='Workspace Builder', url,
  } = {}) {
    this.appId = appId;
    this.serviceName = serviceName;
    this._api = SYMPHONY_API;
    this._nextId = 10;

    this.title = title;
    this.url = url;
  }

  _getNextId() {
    return `${this.serviceName}-${this._nextId++}`;
  }

  /**
   * Use inside the controller to register the service, or just run
   * SYMPHONY.services.register(serviceName) in your controller.
   */
  register() {
    this._wbService = this._api.services.register(this.serviceName);
  }

  /**
   * Initialize the workspace builder inside your app after you have run application.connect
   * @param [navService] - send if you've already subscribed to 'applications-nav' service
   * @param [modulesService] - send if you've already subscribed to 'modules' service
   */
  init({navService, modulesService} = {}) {
    this._wbService = this._api.services.subscribe(this.serviceName);

    this._navService = navService || this._api.services.subscribe('applications-nav');
    this._navService.add(`${this.appId}-wb-open`, this.title, this.serviceName);

    this._modulesService = modulesService || this._api.services.subscribe('modules');

    this._wbService.implement({
      select: id => this.show(),
    });
  }

  /**
   * @param [url] - if not specified, opens the base page.
   * @param [name] - if not specified, uses the base name.
   */
  show({url=this.url, title=this.title} = {}) {
    this._modulesService.show(
      this._getNextId(), title, this.serviceName, url,
      {canFloat: true, parentModuleId: this.appId}
    )
  }

  destroy() {
    this._navService.remove(`${this.appId}-wb-open`);
  }
}
