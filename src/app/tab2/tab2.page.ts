import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file';
//Extra Libraries, Need to install
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Chooser } from '@ionic-native/chooser/ngx';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  uri:any;
  fileName:any;
  uploadStatus:any;
  uploadFileName:any;
  uploadFilePath:any;
  filePathToBeUploaded:any;
  uploadMessage:any;
  loading:any;

  constructor(public navCtrl: NavController,
    private transfer: FileTransfer,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private fileChooser: FileChooser,
    private filePath: FilePath,
    private chooser: Chooser) {}

    async chooseFile(){
      this.fileChooser.open()
      .then(uri => {
        this.uri=uri;
        return uri;
      })
      //Get filename using filepath library
      .then(uri=>this.filePath.resolveNativePath(uri))
      .then(filePath => {
        let filename:any = filePath.split('/');
        this.fileName = filename[filename.length - 1];
        //return(filename)
      });
    }
  async uploadFile() {
    
    //Start Transfering using file transfer plugin
    //.then(filename=>{
      //this.fileName=this.filename;
      //this.loading = this.createLoading();
      //this.dismissLoading(this.loading);
      //this.presentLoading(loading);
     /*  let loader = this.loadingCtrl.create({
        message: "Uploading..."
      });
      loader.present(); */
      this.uploadFileName=this.fileName;
      this.uploadFilePath = this.uri;
     // this.filePathToBeUploaded=
      console.log("Uploading file::"+this.fileName);
      
      const fileTransfer: FileTransferObject = this.transfer.create();
      let options: FileUploadOptions = {
        fileKey: 'file',
        fileName: this.fileName,
        chunkedMode: false,
        headers: {}
      }
      fileTransfer.upload(this.uri, 'https://localhost/file/bill', options)
        .then((data) => {
          this.uploadStatus=data.responseCode;
          this.uploadMessage=JSON.stringify(data.response);
          console.log(data+" Uploaded Successfully");
          alert(JSON.stringify(data.response));
          //loader.dismiss();
          //this.dismissLoading(this.loading);
          //this.presentToast("Image uploaded successfully");
      }, (err) => {
        console.log(err);
      });
    //}
  }
  //   .catch(err => {
  //     //this.dismissLoading(this.loading);
  //     alert(err)
  //   });
  // }

  asyncpresentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 6000,
      position: 'bottom'
    });

    /* toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    }); */
    //toast.present();
  }
  async createLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Uploading...',
    });
    return await loading.present();

    //await loading.dismiss();

    console.log('Loading dismissed!');
  }

  /* async dismissLoading(loading:LoadingController){
    await loading.dismiss();
  } */
}
