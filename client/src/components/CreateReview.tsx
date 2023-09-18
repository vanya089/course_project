import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {AppDispatch} from "../redux/store";
import {createReview} from "../redux/slices/reviews/asyncActions";

const CreateReview: React.FC = () => {
    const [drag, setDrag] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

    function dragStartHandler(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
        setDrag(true);
    }

    function dragLeaveHandler(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
        setDrag(false);
    }

    /* async function onDropHandler(e: React.DragEvent<HTMLDivElement>) {
         e.preventDefault();
         setDrag(false);

         const formData = new FormData();
         formData.append("title", (document.getElementById("title") as HTMLInputElement)?.value || "");
         formData.append("year", (document.getElementById("year") as HTMLInputElement)?.value || "");
         formData.append("genre", (document.getElementById("genre") as HTMLInputElement)?.value || "");
         formData.append("description", (document.getElementById("description") as HTMLInputElement)?.value || "");
         formData.append("file", e.dataTransfer.files[0]);

         try {
             await dispatch(createReview(formData));

         } catch (error) {
             console.error("Ошибка при создании обзора:", error);

         }
     }*/
    const formHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const imageInput = document.getElementById("file") as HTMLInputElement;
        if (!imageInput || !imageInput.files || imageInput.files.length === 0) {
            alert("Please select an image file.");
            return;
        }

        const formData = new FormData(e.currentTarget);
        const title = formData.get('title') as string;
        const year = formData.get('year') as string;
        const genre = formData.get('genre') as string;
        const description = formData.get('description') as string;
        const image = formData.get("file") as File | null;

        if (!title || !year || !genre || !description || !image) {
            alert("Please fill out all fields and select an image.");
            return;
        }

   /*     if (image) {
            formData.append("file", image);
        }
        console.log(image)*/

        dispatch(createReview({
            title,
            year,
            genre,
            description,
            image,
        }));
    };


    return (
        <div className="mx-auto my-40 h-[390px] w-[400px]">
            <form
                className="flex flex-col gap-5"
                encType="multipart/form-data"
                onSubmit={formHandler}
            >
                <input className="text-black px-2 rounded" type="text" placeholder="title" id="title" name="title"/>
                <input className="text-black px-2 rounded" type="text" placeholder="year" id="year" name="year"/>
                <input className="text-black px-2 rounded" type="text" placeholder="genre" id="genre" name="genre"/>
                <textarea className="text-black px-2 rounded" placeholder="description" id="description"
                          name="description"></textarea>
                <input  type="file" placeholder="file" id="file" name="file"/>
                {/*  <label>

                    <span className="p-2 border-2 rounded cursor-pointer">Choose image</span>
                </label>*/}
                {/* {drag
                    ? <div
                        className="w-[21vw] h-[30vh] border-4 border-dashed border-white flex items-center justify-center"
                        onDragStart={e => dragStartHandler(e)}
                        onDragLeave={e => dragLeaveHandler(e)}
                        onDragOver={e => dragStartHandler(e)}
                       // onDrop={e => onDropHandler(e)}
                    >
                        Отпустите файлы, чтобы загрузить
                    </div>
                    : <div className="w-[21vw] h-[30vh]" onDragStart={e => dragStartHandler(e)}
                           onDragLeave={e => dragLeaveHandler(e)}
                           onDragOver={e => dragStartHandler(e)}>
                        Перетащите сюда обложку, чтобы загрузить
                    </div>
                }*/}
                <button className="border rounded items-center mx-auto w-48" type="submit">Отправить</button>
            </form>
        </div>
    );
};

export default CreateReview;

/*import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {AppDispatch} from "../redux/store";
import {createReview} from "../redux/slices/reviews/asyncActions";

const CreateReview: React.FC = () => {
    const [drag, setDrag] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

    function dragStartHandler(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
        setDrag(true);
    }

    function dragLeaveHandler(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
        setDrag(false);
    }

    async function onDropHandler(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
        setDrag(false);

        const formData = new FormData();
        formData.append("title", (document.getElementById("title") as HTMLInputElement)?.value || "");
        formData.append("year", (document.getElementById("year") as HTMLInputElement)?.value || "");
        formData.append("genre", (document.getElementById("genre") as HTMLInputElement)?.value || "");
        formData.append("description", (document.getElementById("description") as HTMLInputElement)?.value || "");
        formData.append("file", e.dataTransfer.files[0]);

        try {
            await dispatch(createReview(formData));

        } catch (error) {
            console.error("Ошибка при создании обзора:", error);

        }
    }

    return (
        <div className="mx-auto my-40 h-[390px] w-[400px]">
            <form
                className="flex flex-col gap-5"
                encType="multipart/form-data"

            >
                <input className="text-black px-2" type="text" placeholder="title" id="title" name="title"/>
                <input className="text-black px-2" type="text" placeholder="year" id="year" name="year"/>
                <input className="text-black px-2" type="text" placeholder="genre" id="genre" name="genre"/>
                <textarea className="text-black px-2" placeholder="description" id="description" name="description"></textarea>
                {drag
                    ? <div
                        className="w-[21vw] h-[30vh] border-4 border-dashed border-white flex items-center justify-center"
                        onDragStart={e => dragStartHandler(e)}
                        onDragLeave={e => dragLeaveHandler(e)}
                        onDragOver={e => dragStartHandler(e)}
                        onDrop={e => onDropHandler(e)}
                    >
                        Отпустите файлы, чтобы загрузить
                    </div>
                    : <div className="w-[21vw] h-[30vh]" onDragStart={e => dragStartHandler(e)}
                           onDragLeave={e => dragLeaveHandler(e)}
                           onDragOver={e => dragStartHandler(e)}>
                        Перетащите сюда обложку, чтобы загрузить
                    </div>
                }
                <button type="submit">Отправить</button>
            </form>
        </div>
    );
};

export default CreateReview;*/
