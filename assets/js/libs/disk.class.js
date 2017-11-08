export default class Disk {

    constructor(driver, remote_url, username, password){
        this.disk = null;
        let webdav_class = null;
        switch(driver){
            case 'local':
                webdav_class = require('./disk_driver/local.class').default;
                this.disk = new webdav_class(remote_url);
                break;
            case 'webdav':
            case 'jianguoyun':
            case 'owncloud':
            case 'nextcloud':
            default:
                webdav_class = require('./disk_driver/webdav.class').default;
                this.disk = new webdav_class(remote_url, username, password);
                break;
        }
    }
    getStat(remote_file_name, success_handler, error_handler){
        this.disk.getStat(remote_file_name, success_handler, error_handler);
    }
    createDirectory(remote_file_name, success_handler, error_handler){
        this.disk.createDirectory(remote_file_name, success_handler, error_handler);
    }
    getDirectoryContents(remote_file_name, success_handler, error_handler){
        this.disk.getDirectoryContents(remote_file_name, success_handler, error_handler);
    }
    getFileContent(remote_file_name, success_handler, error_handler){
        this.disk.getFileContent(remote_file_name, success_handler, error_handler);
    }
    putFileContent(remote_file_name, content, success_handler, error_handler){
        this.disk.putFileContent(remote_file_name, content, success_handler, error_handler);
    }
    deleteFile(remote_file_name, success_handler, error_handler){
        this.disk.deleteFile(remote_file_name, success_handler, error_handler);
    }

    static get driver_arr(){
        return {
            local: {name: 'Local', remote_url: window.user_documents_path},
            jianguoyun: {name: '坚果云', remote_url: 'https://dav.jianguoyun.com/dav'},
            owncloud: {name: 'Owncloud', remote_url: ''},
            nextcloud: {name: 'Nextcloud', remote_url: ''},
            webdav: {name: 'Webdav', remote_url: ''},
        };
    }
}