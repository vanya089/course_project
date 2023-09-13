import React, {useState} from 'react';


const CreateReview: React.FC = () => {
    const [drag, setDrag] = useState(false)

    function dragStartHandler(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
        setDrag(true);
    }

    function dragLeaveHandler(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
        setDrag(false);
    }

    function onDropHandler(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();

        let files = Array.from(e.dataTransfer.files);
        setDrag(false)
    }

    return (
        <div className="mx-auto my-40 h-[390px] w-[400px]">
            <div className="flex flex-col gap-5">
                <input className="text-black px-2" type="text" placeholder="title"/>
                <textarea className="text-black px-2" placeholder="description" name="description"></textarea>
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
                    : <div className="w-[21vw] h-[30vh]"
                           onDragStart={e => dragStartHandler(e)}
                           onDragLeave={e => dragLeaveHandler(e)}
                           onDragOver={e => dragStartHandler(e)}
                    >Перетащите сюда обложку, чтобы загрузить</div>
                }
            </div>
        </div>
    );
};

export default CreateReview;