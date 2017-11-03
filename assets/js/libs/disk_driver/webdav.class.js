export default class Webdav {
    constructor(remote_url, username, password){
        this.webdav_client_obj = window.webdav.connect(
            remote_url,
            username,
            password
        );
    }

    _formatFile(file){
        return {
            filename: file.filename, // "/idees"
            basename: file.basename, // "idees"
            lastmod: new Date(String(file.lastmod)).getTime(), // Tue, 31 Oct 2017 15:25:19 GMT
            size: file.size,
            type: file.type, // directory, file
            content: file.content ? file.content : null,
        }
    }

    getStat(remote_file_name, success_handler, error_handler){
        this.webdav_client_obj.stat(remote_file_name)
            .then((file)=>{
                success_handler(this._formatFile(file));
            })
            .catch((e)=>{
                error_handler(e);
            });
    }
    createDirectory(remote_file_name, success_handler, error_handler){
        this.webdav_client_obj.createDirectory(remote_file_name)
            .then((response)=>{
                if(response.status == 201){
                    success_handler();
                }
            })
            .catch((e)=>{
                error_handler(e);
            });
    }
    getDirectoryContents(remote_file_name, success_handler, error_handler){
        this.webdav_client_obj.getDirectoryContents(remote_file_name)
            .then((file_arr)=>{
                for(let i=0; i<file_arr.length; i++){
                    file_arr[i] = this._formatFile(file_arr[i]);
                }
                success_handler(file_arr);
            })
            .catch((e)=>{
                error_handler(e);
            });
    }
    getFileContent(remote_file_name, success_handler, error_handler){
        this.webdav_client_obj.getFileContents(remote_file_name)
            .then((buffer, string)=>{
                let buf = new Buffer(buffer);
                let content = buf.toString();
                success_handler(content);
            })
            .catch((e)=>{
                error_handler(e);
            });
    }
    putFileContent(remote_file_name, content, success_handler, error_handler){
        this.webdav_client_obj.putFileContents(remote_file_name, content)
            .then(()=>{
                success_handler();
            })
            .catch((e)=>{
                error_handler(e);
            });
    }
    deleteFile(remote_file_name, success_handler, error_handler){
        this.webdav_client_obj.deleteFile(remote_file_name)
            .then(()=>{
                success_handler();
            })
            .catch((e)=>{
                error_handler(e);
            });
    }
}