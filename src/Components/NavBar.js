import React from "react";
import { Buffer } from 'buffer';


const NavBar = (props) => {

    if (!props.userData || !props.userData.updatedUser || !props.userData.updatedUser.profile_picture) {
        return null; // Or render a loading indicator
      }
    
    // console.log(props);
    // console.log(props.userData.updatedUser.profile_picture.data);
    // console.log(props.userData.user.profile_picture.data);
    // const imageUrl = `data:${props.userData?.updatedUser.profile_picture.conentType};base64,${props.userData.updatedUser.profile_picture.data}`;
    // console.log(props.userData.imageUrl);
    // console.log("BELOW");
    // console.log(props.userData.user.profile_picture.data.data);
    
    // const uint8Array = new Uint8Array(props.userData.user.profile_picture.data.data);
    // const buffer = Buffer.from(uint8Array);
    // const base64Image = buffer.toString('base64');
    // console.log(base64Image);
    // const imageUrl = `data:image/jpeg;base64,${base64Image}`;
    

    // // Get profile picture and convert buffer to base64-encoded string
    // const profilePictureData = props.userData.profile_picture.data;
    // const imageData = profilePictureData.data.toString('base64');
    // // console.log(imageData);
    // // // console.log(profilePictureData);
    // // // console.log(profilePictureData.toString("base64"));

    // const profilePicture = `data:${props.userData.profile_picture.contentType};base64,${imageData}`; 

    // // // console.log(profilePicture);

    // const uint8Array = new Uint8Array(props.userData.profile_picture.data);
    // const blob = new Blob([uint8Array], { type: "image/jpeg"} );
    // console.log(blob)
    // const imageUrl = URL.createObjectURL(blob);
    // console.log(imageUrl);
    // const base64Image = uint8Array.toString("base64");
    // const imageUrl = `data:image/jpeg;base64,${base64Image}`;

    

    return(
        <div className="navigation-component">
            <div className="navigation-conent">
                <div className="nav-left-side">
                    <div>logo</div>
                    <div>title</div>
                </div>
                <div className="nav-right-side">
                    <div className="nav-search">
                        search
                    </div>
                    <div className="create">create</div>
                    <img src={`data:${props.userData.updatedUser.profile_picture.conentType};base64,${props.userData.updatedUser.profile_picture.data}`} alt="Image" />
                </div>

            </div>
        </div>
    )
}

export default NavBar;