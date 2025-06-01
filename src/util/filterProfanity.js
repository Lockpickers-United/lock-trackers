import {
    RegExpMatcher,
    TextCensor,
    englishDataset,
    englishRecommendedTransformers,
} from 'obscenity'

export default function filterProfanity(input) {
    const matcher = new RegExpMatcher({
        ...englishDataset.build(),
        ...englishRecommendedTransformers,
    })
    const censor = new TextCensor()
    const matches = matcher.getAllMatches(input)
    return censor.applyTo(input, matches)
}
