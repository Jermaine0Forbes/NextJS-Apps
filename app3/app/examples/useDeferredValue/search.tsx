import { Card, TextField, Container, Select } from "@radix-ui/themes"
import { MagnifyingGlassIcon } from "@radix-ui/react-icons"
import "@radix-ui/themes/styles.css";

type SearchProps = {
    genres: Array<string>
}
export default function Search(children: SearchProps) {
    const { genres } = children;
    return (
        <Card>
            <Container >
                <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-2">
                        <TextField.Root placeholder="Search for movies..." >
                            <TextField.Slot><MagnifyingGlassIcon /></TextField.Slot>
                        </TextField.Root>
                    </div>
                    <div className="col">
                        <Select.Root >
                            <Select.Trigger  placeholder="Genres" className="w-full" style={{width:'100%'}}/>
                            <Select.Content>
                                <Select.Group>
                                    {/* <Select.Label>Genres</Select.Label> */}
                                    {
                                        genres.length > 0 ?
                                            genres.map((genre: string, i: number) => (<Select.Item value={genre} key={i}>{genre}</Select.Item>))
                                            :
                                            (
                                                <Select.Item value="">No genres at the moment</Select.Item>
                                            )
                                    }

                                </Select.Group>
                            </Select.Content>
                        </Select.Root>
                    </div>

                </div>
            </Container>
        </Card>
    )
}