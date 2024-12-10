"use client"
import { list } from "postcss"
import Typewriter from "typewriter-effect"

type Props = {
	texts: string[]
}

function TypeWriter({ texts }: Props) {

	return (
		<Typewriter
			options={{
				loop: true
			}}
			onInit={(typeWriter) => {
				typeWriter.typeString(texts[0]).start().pauseFor(1000).deleteAll()
				typeWriter.typeString(texts[1]).start().pauseFor(1000).deleteAll()
				typeWriter.typeString(texts[2]).start().pauseFor(1000).deleteAll()
			}} />
	)
}

export { TypeWriter }