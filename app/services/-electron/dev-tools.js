import Service from '@ember/service';

// Constants
const IPC_CHANNEL = 'DEV_TOOLS';

export default Service.extend({
  open() {
    const {ipcRenderer} = requireNode('electron');

    ipcRenderer.send(IPC_CHANNEL);
  }
});
