export default class Local {
    constructor(basefolder){
        this.local_file_obj = Fs;
        this.basefolder = basefolder;
    }

    _formatFile(file, filename){
        let filename_tmp = String(filename).split('/');
        let basename = filename_tmp[filename_tmp.length-1];
        return {
            filename: filename, // "/idees"    relative path
            basename: basename, // "idees"
            lastmod: new Date(String(file.mtime)).getTime(), // Tue, 31 Oct 2017 15:25:19 GMT
            size: file.size,
            type: file.isFile() ? 'file' : 'directory', // directory, file
            content: file.content ? file.content : null,
        }
    }

    // relative path to real path
    _compileFilename(filename){
        let basefolder = this.basefolder;
        if(!_.endsWith(basefolder, '/')){
            basefolder += '/';
        }
        if(_.startsWith(filename, '/')){
            filename = String(filename).substr(1);
        }

        return basefolder + filename;
    }

    _combineFilename(folder, filename){
        let basefolder = folder;
        if(!_.endsWith(basefolder, '/')){
            basefolder += '/';
        }
        if(_.startsWith(filename, '/')){
            filename = String(filename).substr(1);
        }

        return basefolder + filename;
    }

    getStat(remote_file_name, success_handler, error_handler){
        this.local_file_obj.stat(this._compileFilename(remote_file_name), (e, stat)=>{
            if(e != null){
                error_handler(e);
            }else{
                success_handler(this._formatFile(stat, remote_file_name));
            }
        });
    }
    createDirectory(remote_file_name, success_handler, error_handler){
        this.local_file_obj.mkdir(this._compileFilename(remote_file_name), (e)=>{
            if(e != null){
                error_handler(e);
            }else{
                success_handler();
            }
        });
    }
    getDirectoryContents(remote_file_name, success_handler, error_handler){
        this.local_file_obj.readdir(this._compileFilename(remote_file_name), (e, files)=>{
            if(e != null){
                error_handler(e);
            }else{
                let file_arr = [];
                for(let i=0; i<files.length; i++){
                    this.getStat(this._combineFilename(remote_file_name, files[i]), (file)=>{
                        file_arr[i] = file;
                        if(file_arr.length == files.length){
                            success_handler(file_arr);
                        }
                    }, (e)=>{
                        error_handler(e);
                    });
                }
            }
        });
    }
    getFileContent(remote_file_name, success_handler, error_handler){
        this.local_file_obj.readFile(this._compileFilename(remote_file_name), (e, data)=>{
            if(e != null){
                error_handler(e);
            }else{
                let buf = new Buffer(data);
                let content = buf.toString();
                success_handler(content);
            }
        });
    }
    putFileContent(remote_file_name, content, success_handler, error_handler){
        this.local_file_obj.writeFile(this._compileFilename(remote_file_name), content, (e)=>{
            if(e != null){
                error_handler(e);
            }else{
                success_handler();
            }
        })
    }
    deleteFile(remote_file_name, success_handler, error_handler){
        this.local_file_obj.unlink(this._compileFilename(remote_file_name), (e)=>{
            if(e != null){
                error_handler(e);
            }else{
                success_handler();
            }
        })
    }
}