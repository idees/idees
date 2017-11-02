export default class Disk {

    constructor(driver, remote_url, username, password){
        this.disk = null;
        let webdav_class = null;
        switch(driver){
            case 'webdav':
                webdav_class = require('./disk_driver/webdav.class').default;
                this.disk = new webdav_class(remote_url, username, password);
                break;
            case 'dropbox':
                webdav_class = require('./disk_driver/webdav.class').default;
                this.disk = new webdav_class(remote_url, username, password);
                break;
            default:
                this.disk = null;
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
            webdav: 'Webdav',
            dropbox: 'Dropbox',
        };
    }
}