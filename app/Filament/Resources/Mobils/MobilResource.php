<?php

namespace App\Filament\Resources\Mobils;

use App\Filament\Resources\Mobils\Pages\CreateMobil;
use App\Filament\Resources\Mobils\Pages\EditMobil;
use App\Filament\Resources\Mobils\Pages\ListMobils;
use App\Filament\Resources\Mobils\Schemas\MobilForm;
use App\Filament\Resources\Mobils\Tables\MobilsTable;
use App\Models\Mobil;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class MobilResource extends Resource
{
    protected static ?string $model = Mobil::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static ?string $navigationLabel = 'Mobil';

    protected static ?string $modelLabel = 'Mobil';

    protected static ?string $pluralModelLabel = 'Mobil';

    protected static ?string $recordTitleAttribute = 'nama_mobil';

    public static function form(Schema $schema): Schema
    {
        return MobilForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return MobilsTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListMobils::route('/'),
            'create' => CreateMobil::route('/create'),
            'edit' => EditMobil::route('/{record}/edit'),
        ];
    }
}
