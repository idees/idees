class DriverInterface {
    constructor(){

    }
    _formatFile(file){}
    getStat(remote_file_name, success_handler, error_handler){}
    createDirectory(remote_file_name, success_handler, error_handler){}
    getDirectoryContents(remote_file_name, success_handler, error_handler){}
    getFileContent(remote_file_name, success_handler, error_handler){}
    putFileContent(remote_file_name, content, success_handler, error_handler){}
    deleteFile(remote_file_name, success_handler, error_handler){}
}