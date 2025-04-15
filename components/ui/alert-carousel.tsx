import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext,
} from "./carousel";
import { forwardRef, useState } from "react";

type AlertDialogBoxProps = {
    texts: string[];
    heading: string;
    isOpened: boolean;
};

export const AlertDialogBox = ({
    texts,
    heading,
    isOpened,
}: AlertDialogBoxProps) => {
    const [isLast, setIsLast] = useState(false);
    const [isOpen, setIsOpen] = useState(isOpened);
    return (
        <AlertDialog open={isOpen}>
            <AlertDialogTrigger asChild>
                <Button className="hidden" variant="outline">
                    Show Dialog
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="flex flex-col justify-around">
                <AlertDialogHeader className="flex flex-col justify-center">
                    <AlertDialogTitle>
                        <div>{heading}</div>
                    </AlertDialogTitle>
                    <AlertDialogDescription className="flex justify-around">
                        <Carousel
                            setIsLast={setIsLast}
                            className="w-full max-w-xs"
                        >
                            <CarouselContent>
                                {texts.map((text, index) => (
                                    <CarouselItem key={index}>
                                        <div className="p-1">
                                            <span className="text-xl font-semibold">
                                                <div>{text}</div>
                                            </span>
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious />
                            <CarouselNext setIsLast={setIsLast} />
                        </Carousel>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                {isLast && (
                    <AlertDialogFooter>
                        <AlertDialogAction
                            onClick={() => {
                                setIsOpen(false);
                            }}
                        >
                            Continue
                        </AlertDialogAction>
                    </AlertDialogFooter>
                )}
            </AlertDialogContent>
        </AlertDialog>
    );
};
