import { useState, useCallback, useEffect } from 'react';
import { OnClick } from 'src/components/arrow-button/ArrowButton';
import arrowButtonStyles from '../../arrow-button/ArrowButton.module.scss';
import styles from '../ArticleParamsForm.module.scss';

export const useFormToggle = (
	initialState = false,
	form: React.RefObject<HTMLFormElement | null>
) => {
	const [isOpen, setIsOpen] = useState<boolean>(initialState);

	const toggle: OnClick = useCallback(() => {
		setIsOpen((prevIsOpen) => !prevIsOpen);
	}, []);

	useEffect(() => {
		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === 'Escape') setIsOpen(false);
		};

		const checkTarget = (target: EventTarget): boolean => {
			const buttonElement = target as HTMLElement;
			const isScrollbarClick = (target as HTMLElement).classList.contains(
				styles.scrollbar
			);
			return (
				!buttonElement.classList.contains(arrowButtonStyles.arrow) &&
				!buttonElement.classList.contains(arrowButtonStyles.container) &&
				!isScrollbarClick
			);
		};

		const handleOutsideClick = (event: MouseEvent) => {
			const { target } = event;
			const isScrollbarClick =
				target instanceof HTMLElement &&
				(target === document.documentElement ||
					target === document.body ||
					target.classList.contains('scrollbar'));

			if (
				target instanceof Node &&
				!form.current?.contains(target) &&
				!isScrollbarClick &&
				checkTarget(target)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener('keydown', handleEscape);
		document.addEventListener('mousedown', handleOutsideClick);

		return () => {
			document.removeEventListener('keydown', handleEscape);
			document.removeEventListener('mousedown', handleOutsideClick);
		};
	}, [form]);

	return { isOpen, toggle } as const;
};
