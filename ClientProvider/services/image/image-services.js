import { postAxios } from '../../lib/axios';

let url = '/upload';
let ImageService = {
    uploadFile: async (data) => {
        try {
            var bodyFormData = new FormData();
            let file = data.split("/");
            let name = file[file.length-1];
            let type = `image/${name.split(".")[1]}`;

            bodyFormData.append('image',{
                uri: data,
                name: name,
                type: type,
            });
            let res = await postAxios(url, bodyFormData, true);
            return res.url;
        } catch (error) {
            console.log(error);
        }
    },
    
}

module.exports = ImageService;